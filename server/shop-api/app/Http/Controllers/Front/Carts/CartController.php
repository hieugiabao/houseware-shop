<?php

namespace App\Http\Controllers\Front\Carts;

use App\Http\Controllers\Controller;
use App\Shop\Carts\Repositories\CartRepository;
use App\Shop\Carts\Repositories\CartRepositoryInterface;
use App\Shop\Carts\Requests\AddToCartParamsRequest;
use App\Shop\Carts\Requests\RemoveToCartRequest;
use App\Shop\Carts\Requests\UpdateCartRequest;
use Illuminate\Http\Request;

class CartController extends Controller
{
  /**
   * @var CartRepositoryInterface $cartRepo
   *
   */
  private $cartRepo;

  /**
   * CartController constructor.
   *
   * @param CartRepositoryInterface $cartRepository
   */
  public function __construct(CartRepositoryInterface $cartRepository)
  {
    $this->cartRepo = $cartRepository;
  }

  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function addToCart(AddToCartParamsRequest $request)
  {
    $customer = auth()->guard('api')->user();
    $data = $request->all();
    $data['customer_id'] = $customer->id;

    $cartItem = $this->cartRepo->addToCart($data);
    return response()->json(['message' => 'Item added to cart', 'item' => $cartItem], 201);
  }

  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function updateCart(UpdateCartRequest $request)
  {
    $customer = auth()->guard('api')->user();
    $data = $request->all();

    $cartItem = $this->cartRepo->findCartItemByPk($data['product_id'], $customer->id);
    $cartRepo = new CartRepository($cartItem);

    $cartRepo->updateCart($data);
    return response()->json(['message' => 'Item updated in cart', 'item' => $cartItem], 200);
  }

  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function removeToCart(RemoveToCartRequest $request)
  {
    $customer = auth()->guard('api')->user();
    $product_ids = $request->input('product_ids');

    collect($product_ids)->each(function ($product_id) use ($customer) {
      $cartItem = $this->cartRepo->findCartItemByPk($product_id, $customer->id);
      $cartRepo = new CartRepository($cartItem);
      $cartRepo->deleteCartItem();
    });
    return response()->json(['message' => 'Cart deleted'], 200);
  }
}
