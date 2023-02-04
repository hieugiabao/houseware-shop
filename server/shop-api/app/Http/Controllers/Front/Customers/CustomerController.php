<?php

namespace App\Http\Controllers\Front\Customers;

use App\Http\Controllers\Controller;
use App\Shop\Addresses\Repositories\AddressRepository;
use App\Shop\Addresses\Repositories\AddressRepositoryInterface;
use App\Shop\Addresses\Requests\CreateAddressRequest;
use App\Shop\Addresses\Requests\UpdateAddressRequest;
use App\Shop\Customers\Repositories\CustomerRepositoryInterface;

class CustomerController extends Controller
{
  /**
   * @var CustomerRepositoryInterface $customerRepo
   */
  private $customerRepo;

  /**
   * @var AddressRepositoryInterface
   */
  private $addressRepo;

  /**
   * CustomerController constructor.
   *
   * @param CustomerRepositoryInterface $customerRepository
   * @param AddressRepositoryInterface $addressRepository
   */
  public function __construct(CustomerRepositoryInterface $customerRepository, AddressRepositoryInterface $addressRepository)
  {
    $this->customerRepo = $customerRepository;
    $this->addressRepo = $addressRepository;
  }

  public function getAllAddresses()
  {
    $addresses = $this->addressRepo->listCustomerAddresses(auth()->user()->id);

    return response()->json([
      'data' => $addresses
    ], 200);
  }

  public function addAddress(CreateAddressRequest $request)
  {
    $request['customer_id'] = auth()->user()->id;

    $address = $this->addressRepo->createAddress($request->except('_token', '_method'));

    return response()->json([
      'message' => 'Address created successfully',
      'data' => $address
    ], 201);
  }

  public function updateAddress(UpdateAddressRequest $request, $addressId)
  {
    $address = $this->addressRepo->findAddressById($addressId);

    $request = $request->except('_token', '_method');
    $request['customer_id'] = auth()->user()->id;

    $addressRepo = new AddressRepository($address);
    $addressRepo->updateAddress($request);

    return response()->json([
      'message' => 'Address updated successfully'
    ], 200);
  }

  public function deleteAddress($addressId)
  {
    $address = $this->addressRepo->findAddressById($addressId);

    if ($address->orders()->exists()) {
      $address->status = 0;
      $address->save();
    } else {
      $address->delete();
    }

    return response()->json([
      'message' => 'Address deleted successfully'
    ], 200);
  }
}
