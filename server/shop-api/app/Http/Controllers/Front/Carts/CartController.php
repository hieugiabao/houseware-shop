<?php

namespace App\Http\Controllers\Front\Carts;

use App\Http\Controllers\Controller;
use App\Shop\Carts\Repositories\CartRepositoryInterface;
use App\Shop\Carts\Requests\AddToCartRequest;
use App\Shop\Carts\Requests\UpdateCartRequest;
use App\Shop\ProductAttributes\Repositories\ProductAttributeRepositoryInterface;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
  /**
   * @var CartRepositoryInterface $cartRepo
   *
   */
  private $cartRepo;

  /**
   * @var ProductRepositoryInterface
   */
  private $productRepo;

  /**
   * @var ProductAttributeRepositoryInterface
   */
  private $productAttributeRepo;

  /**
   * CartController constructor.
   * @param CartRepositoryInterface $cartRepository
   * @param ProductRepositoryInterface $productRepository
   * @param ProductAttributeRepositoryInterface $productAttributeRepository
   */
  public function __construct(
    CartRepositoryInterface $cartRepository,
    ProductRepositoryInterface $productRepository,
    ProductAttributeRepositoryInterface $productAttributeRepository
  ) {
    $this->cartRepo = $cartRepository;
    $this->productRepo = $productRepository;
    $this->productAttributeRepo = $productAttributeRepository;
  }

  public function getCart()
  {
    if (auth()->user()) {
      $this->cartRepo->openCart(auth()->user());
    }

    $cartItems = $this->cartRepo->getCartItemsTransformed()->toArray();
    $subTotal = $this->cartRepo->getSubTotal();
    $tax = $this->cartRepo->getTax();
    $total = $this->cartRepo->getTotal(2);

    return response()->json([
      'cart_items' => array_values($cartItems),
      'sub_total' => $subTotal,
      'tax' => $tax,
      'total' => $total
    ], 200);
  }

  public function addToCart(AddToCartRequest $request)
  {
    $product = $this->productRepo->findProductById($request->input('product'));

    if ($product->attributes()->count() > 0) {
      $productAttr = $product->attributes()->where('default', 1)->first();

      if (isset($productAttr->price)) {
        $product->price = $productAttr->price;

        if (!is_null($productAttr->sale_price)) {
          $product->sale_price = $productAttr->sale_price;
        }
      }
    }

    $options = [];
    if ($request->has('productAttribute')) {

      $attr = $this->productAttributeRepo->findProductAttributeById($request->input('productAttribute'));

      $product->price = $attr->sale_price ?? $attr->price;

      $options['product_attribute_id'] = $request->input('productAttribute');
      $options['combination'] = $attr->attributesValues->toArray();
    }

    $item = $this->cartRepo->addToCart($product, $request->input('quantity'), $options);

    if ($request->user()) {
      $this->cartRepo->saveCart(auth()->user());
    }
    return response()->json($this->cartRepo->getItemTransformed($item), 200);
  }

  public function update(UpdateCartRequest $request, $id)
  {
    $item = $this->cartRepo->updateQuantityInCart($id, $request->input('quantity'));

    return response()->json($this->cartRepo->getItemTransformed($item), 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $this->cartRepo->removeToCart($id);

    return response()->json([
      'message' => 'Item removed from cart'
    ], 200);
  }
}
