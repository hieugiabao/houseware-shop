<?php

namespace App\Providers;

use App\Shop\Categories\Repositories\CategoryRepository;
use App\Shop\Categories\Repositories\CategoryRepositoryInterface;
use App\Shop\Customers\Repositories\CustomerRepository;
use App\Shop\Customers\Repositories\CustomerRepositoryInterface;
use App\Shop\Employees\Repositories\EmployeeRepository;
use App\Shop\Employees\Repositories\EmployeeRepositoryInterface;
use App\Shop\Products\Repositories\ProductRepository;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
  public function register()
  {
    $this->app->bind(
      CustomerRepositoryInterface::class,
      CustomerRepository::class,
    );

    $this->app->bind(
      ProductRepositoryInterface::class,
      ProductRepository::class,
    );

    $this->app->bind(
      CategoryRepositoryInterface::class,
      CategoryRepository::class,
    );

    $this->app->bind(
      EmployeeRepositoryInterface::class,
      EmployeeRepository::class,
    );
  }
}
