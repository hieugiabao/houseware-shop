<?php

namespace App\Shop\Employees\Repositories;

use App\Shop\Employees\Employee;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepositoryInterface;

interface EmployeeRepositoryInterface extends BaseRepositoryInterface
{
  public function listEmployees(string $order = 'id', string $sort = 'desc'): Collection;

  public function createEmployee(array $params): Employee;

  public function findEmployeeById(int $id): Employee;

  public function updateEmployee(array $params): Employee;

  public function deleteEmployee(): bool;

  public function isAuthUser(Employee $employee): bool;

  public function findEmployeeByEmail(string $email): Employee;
}
