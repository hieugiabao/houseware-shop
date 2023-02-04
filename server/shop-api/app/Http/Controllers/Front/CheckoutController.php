<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Shop\Addresses\Repositories\AddressRepositoryInterface;
use App\Shop\Carts\Repositories\CartRepositoryInterface;
use App\Shop\Carts\Requests\CartCheckoutRequest;
use App\Shop\Couriers\Repositories\CourierRepositoryInterface;
use App\Shop\Customers\Customer;
use App\Shop\Customers\Repositories\CustomerRepository;
use App\Shop\Customers\Repositories\CustomerRepositoryInterface;
use App\Shop\Orders\Repositories\OrderRepositoryInterface;
use App\Shop\PaymentMethods\COD\CODRepository;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Products\Transformations\ProductTransformable;
use App\Shop\Shipping\ShippingInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
  use ProductTransformable;

  /**
   * @var CartRepositoryInterface
   */
  private $cartRepo;

  /**
   * @var CourierRepositoryInterface
   */
  private $courierRepo;

  /**
   * @var AddressRepositoryInterface
   */
  private $addressRepo;

  /**
   * @var CustomerRepositoryInterface
   */
  private $customerRepo;

  /**
   * @var ProductRepositoryInterface
   */
  private $productRepo;

  /**
   * @var OrderRepositoryInterface
   */
  private $orderRepo;

  /**
   * @var ShippingInterface
   */
  private $shippingRepo;

  public function __construct(
    CartRepositoryInterface $cartRepository,
    CourierRepositoryInterface $courierRepository,
    AddressRepositoryInterface $addressRepository,
    CustomerRepositoryInterface $customerRepository,
    ProductRepositoryInterface $productRepository,
    ShippingInterface $shipping,
    OrderRepositoryInterface $orderRepository
  ) {
    $this->cartRepo = $cartRepository;
    $this->courierRepo = $courierRepository;
    $this->addressRepo = $addressRepository;
    $this->customerRepo = $customerRepository;
    $this->productRepo = $productRepository;
    $this->orderRepo = $orderRepository;
    $this->shippingRepo = $shipping;
  }

  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $products = $this->cartRepo->getCartItems();
    $customer = $this->customerRepo->findCustomerById($request->user()->id);
    $rates = null;
    $shipment_object_id = null;

    if (env('ACTIVATE_SHIPPING') == 1) {
      $shipment = $this->createShippingProcess($customer, $products);
      if (!is_null($shipment)) {
        $shipment_object_id = $shipment->object_id;
        $rates = $shipment->rates;
      }
    }

    // Get payment gateways
    $paymentGateways = collect(explode(',', config('payees.name')))->transform(function ($name) {
      return config($name);
    })->all();

    $billingAddress = $customer->addresses()->first();

    return response()->json([
      'customer' => $customer,
      'billingAddress' => $billingAddress,
      'addresses' => $customer->addresses()->get(),
      'subtotal' => $this->cartRepo->getSubTotal(),
      'tax' => $this->cartRepo->getTax(),
      'total' => $this->cartRepo->getTotal(2),
      'payments' => $paymentGateways,
      'cartItems' => array_values($this->cartRepo->getCartItemsTransformed()->toArray()),
      'shipment_object_id' => $shipment_object_id,
      'rates' => $rates
    ], 200);
  }

  public function store(CartCheckoutRequest $request)
  {
    $shippingFee = 0;

    switch ($request->input('payment')) {
      case 'cod':
        $codReposiory = new CODRepository;
        $order = $codReposiory->execute($request);
        $this->cartRepo->clearCart();
        return response()->json(
          [
            'order' => $order,
            'message' => 'Order created successfully'
          ],
          201
        );
      default:
        return response()->json(
          [
            'message' => 'Payment method not supported'
          ],
          400
        );
    }
  }

  /**
   * @param Customer $customer
   * @param Collection $products
   *
   * @return mixed
   */
  private function createShippingProcess(Customer $customer, Collection $products)
  {
    $customerRepo = new CustomerRepository($customer);

    if ($customerRepo->findAddresses()->count() > 0 && $products->count() > 0) {

      $this->shippingRepo->setPickupAddress();
      $deliveryAddress = $customerRepo->findAddresses()->first();
      $this->shippingRepo->setDeliveryAddress($deliveryAddress);
      $this->shippingRepo->readyParcel($this->cartRepo->getCartItems());

      return $this->shippingRepo->readyShipment();
    }
  }
}
