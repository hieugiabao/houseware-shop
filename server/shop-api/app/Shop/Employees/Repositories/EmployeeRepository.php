<?php

namespace App\Shop\Employees\Repositories;

use App\Shop\Employees\Employee;
use App\Shop\Employees\Exceptions\CreateEmployeeInvalidArgumentsException;
use App\Shop\Employees\Exceptions\EmployeeNotFoundException;
use App\Shop\Employees\Exceptions\UpdateEmployeeException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Jsdecena\Baserepo\BaseRepository;

class EmployeeRepository extends BaseRepository implements EmployeeRepositoryInterface
{
  /**
   * @var $model Employee
   *
   */
  protected $model;

  /**
   * EmployeeRepository constructor.
   *
   * @param Employee $employee
   */
  public function __construct(Employee $employee)
  {
    parent::__construct($employee);
    $this->model = $employee;
  }

  /**
   * List all the employees
   *
   * @param string $order
   * @param string $sort
   *
   * @return Collection
   */
  public function listEmployees(string $order = 'id', string $sort = 'desc'): Collection
  {
    return $this->all(['*'], $order, $sort);
  }

  /**
   * Create the employee
   *
   * @param array $data
   *
   * @return Employee
   * @throws CreateEmployeeInvalidArgumentsException
   */
  public function createEmployee(array $data): Employee
  {
    try {
      $data['password'] = Hash::make($data['password']);
      return $this->create($data);
    } catch (QueryException $e) {
      throw new CreateEmployeeInvalidArgumentsException($e->getMessage(), 500, $e);
    }
  }

  /**
   * Find the employee by id
   *
   * @param int $id
   *
   * @return Employee
   * @throws EmployeeNotFoundException
   */
  public function findEmployeeById(int $id): Employee
  {
    try {
      return $this->findOneOrFail($id);
    } catch (ModelNotFoundException $e) {
      throw new EmployeeNotFoundException($e);
    }
  }

  /**
   * Update employee
   *
   * @param array $params
   *
   * @return bool
   * @throws UpdateEmployeeException
   */
  public function updateEmployee(array $params): Employee
  {
    try {
      if (isset($params['password'])) {
        $params['password'] = Hash::make($params['password']);
      }
      $employee = $this->findEmployeeById($params['id']);
      $employee->update($params);
      return $employee;
    } catch (QueryException $e) {
      throw new UpdateEmployeeException($e->getMessage(), 500, $e);
    }
  }

  /**
   * @return bool
   * @throws \Exception
   */
  public function deleteEmployee(): bool
  {
    return $this->delete();
  }

  /**
   * @param Employee $employee
   *
   * @return bool
   */
  public function isAuthUser(Employee $employee): bool
  {
    $isAuthUser = false;
    if (Auth::guard('employee')->user()->id == $employee->id) {
      $isAuthUser = true;
    }
    return $isAuthUser;
  }

  /**
   * @param string $email
   *
   * @return Employee
   * @throws EmployeeNotFoundException
   */
  public function findEmployeeByEmail(string $email): Employee
  {
    try {
      return $this->findOneByOrFail(['email' => $email]);
    } catch (ModelNotFoundException $e) {
      throw new EmployeeNotFoundException($e);
    }
  }
}
