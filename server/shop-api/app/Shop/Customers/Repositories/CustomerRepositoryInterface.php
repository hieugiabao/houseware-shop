<?php

namespace App\Shop\Customers\Repositories;

use App\Shop\Customers\Customer;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepositoryInterface;

interface CustomerRepositoryInterface extends BaseRepositoryInterface
{
  public function listCustomers(string $order = 'id', string $sort = 'desc', array $column = ['*']): Collection;

  public function createCustomer(array $params): Customer;

  public function updateCustomer(array $params): bool;

  public function findCustomerById(int $id): Customer;

  public function deleteCustomer(): bool;

  public function searchCustomer(string $query): Collection;

  public function getCarts(): Collection;

  public function getNumberOfCartItems(): int;
}
