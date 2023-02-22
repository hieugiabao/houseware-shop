<?php

namespace App\Shop\PaymentMethods\COD;

use App\Shop\Carts\Repositories\CartRepository;
use App\Shop\Carts\ShoppingCart;
use App\Shop\Checkout\CheckoutRepository;
use App\Shop\PaymentMethods\PaymentRepositoryInterface;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;


class CODRepository implements PaymentRepositoryInterface
{

  public function execute(Request $request)
  {
    $cartRepo = new CartRepository(new ShoppingCart);
    $checkoutRepo = new CheckoutRepository;

    $cartRepo->openCart($request->user());



    $order = $checkoutRepo->buildCheckoutItems([
      'reference' => Uuid::uuid4()->toString(),
      // 'courier_id' => 1,
      'customer_id' => $request->user()->id,
      'address_id' => $request->input('billing_address'),
      'order_status_id' => 5,
      'payment' => strtolower(config('cod.name')),
      'discounts' => 0,
      'total_products' => $cartRepo->getSubTotal(),
      'total' => $cartRepo->getTotal(),
      'total_paid' => 0,
      'tax' => $cartRepo->getTax()
    ]);

    $cartRepo->clearCart();
    return $order;
  }
}
