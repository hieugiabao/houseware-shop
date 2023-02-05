<?php

namespace App\Shop\Customers\Repositories;

use App\Shop\Addresses\Address;
use App\Shop\Customers\Customer;
use App\Shop\Customers\Exceptions\ChangePasswordErrorException;
use App\Shop\Customers\Exceptions\CreateCustomerInvalidArgumentsException;
use App\Shop\Customers\Exceptions\CustomerNotFoundException;
use App\Shop\Customers\Exceptions\UpdateCustomerInvalidArgumentsException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Jsdecena\Baserepo\BaseRepository;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface
{

  /**
   * @var Customer $model
   */
  public $model;

  /**
   * Constructor
   *
   * @param Customer $customer
   */
  public function __construct(Customer $customer)
  {
    parent::__construct($customer);
    $this->model = $customer;
  }

  /**
   * List all the customers
   *
   * @param string $order
   * @param string $sort
   * @param array $columns
   *
   * @return \Illuminate\Support\Collection
   */
  public function listCustomers(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Collection
  {
    return $this->all($columns, $order, $sort);
  }

  /**
   * Create new customer
   *
   * @param array $params
   *
   * @return Customer
   * @throws CreateCustomerInvalidArgumentsException
   */
  public function createCustomer(array $params): Customer
  {
    try {
      $data = collect($params)->except('password')->all();

      $customer = new Customer($data);
      if (isset($params['password'])) {
        $customer->password = bcrypt($params['password']);
      }

      $customer->save();
      return $customer;
    } catch (QueryException $e) {
      throw new CreateCustomerInvalidArgumentsException($e->getMessage(), 500, $e);
    }
  }

  /**
   * Update the customer
   *
   * @param array $params
   *
   * @return bool
   * @throws UpdateCustomerInvalidArgumentsException
   */
  public function updateCustomer(array $params): bool
  {
    try {
      return $this->model->update($params);
    } catch (QueryException $e) {
      throw new UpdateCustomerInvalidArgumentsException($e->getMessage(), 500, $e);
    }
  }

  /**
   * Find the customer or fail
   *
   * @param int $id
   *
   * @return Customer
   * @throws CustomerNotFoundException
   */
  public function findCustomerById(int $id): Customer
  {
    try {
      return $this->findOneOrFail($id);
    } catch (ModelNotFoundException $e) {
      throw new CustomerNotFoundException($e->getMessage(), 404, $e);
    }
  }

  /**
   * Delete a customer
   *
   * @return bool
   * @throws \Exception
   */
  public function deleteCustomer(): bool
  {
    return $this->delete();
  }

  /**
   * @param string $query
   *
   * @return mixed
   */
  public function searchCustomer(string $query = null): Collection
  {
    if (is_null($query)) {
      return $this->all();
    }
    return $this->model->searchCustomer($query)->get();
  }

  /**
   * @param Address $address
   * @return Address
   */
  public function attachAddress(Address $address): Address
  {
    $this->model->addresses()->save($address);
    return $address;
  }

  /**
   * Find the address attached to the customer
   *
   * @return mixed
   */
  public function findAddresses(): Collection
  {
    return $this->model->addresses;
  }

  /**
   * @param array $columns
   * @param string $orderBy
   *
   * @return Collection
   */
  public function findOrders($columns = ['*'], string $orderBy = 'id'): Collection
  {
    return $this->model->orders()->get($columns)->sortByDesc($orderBy);
  }

  public function changePassword(array $params): bool
  {
    // check old password
    if (!Hash::check($params['current_password'], $this->model->password)) {
      throw new ChangePasswordErrorException('Old password is incorrect');
    }
    $this->model->password = bcrypt($params['password']);
    return $this->model->save();
  }
}
