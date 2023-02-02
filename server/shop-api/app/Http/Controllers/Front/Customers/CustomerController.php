<?php

namespace App\Http\Controllers\Front\Customers;

use App\Http\Controllers\Controller;
use App\Shop\Customers\Repositories\CustomerRepository;
use App\Shop\Customers\Repositories\CustomerRepositoryInterface;

class CustomerController extends Controller
{
  /**
   * @var CustomerRepositoryInterface $customerRepo
   */
  private $customerRepo;

  /**
   * CustomerController constructor.
   *
   * @param CustomerRepositoryInterface $customerRepository
   */
  public function __construct(CustomerRepositoryInterface $customerRepository)
  {
    $this->customerRepo = $customerRepository;
  }

  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function getCartItemCount()
  {
    $customer = auth()->guard('api')->user();
    $custoRepo = new CustomerRepository($customer);
    $num = $custoRepo->getNumberOfCartItems();
    return response()->json(['count' => $num]);
  }

  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function getAllCartItems()
  {
    $customer = auth()->guard('api')->user();
    $custoRepo = new CustomerRepository($customer);

    $items = $custoRepo->getCarts();
    return response()->json($items);
  }
}
