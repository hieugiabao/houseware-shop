<?php

namespace App\Providers;

use App\Shop\Addresses\Repositories\AddressRepository;
use App\Shop\Addresses\Repositories\AddressRepositoryInterface;
use App\Shop\Carts\Repositories\CartRepository;
use App\Shop\Carts\Repositories\CartRepositoryInterface;
use App\Shop\Categories\Repositories\CategoryRepository;
use App\Shop\Categories\Repositories\CategoryRepositoryInterface;
use App\Shop\Cities\Repositories\CityRepository;
use App\Shop\Cities\Repositories\CityRepositoryInterface;
use App\Shop\Customers\Repositories\CustomerRepository;
use App\Shop\Customers\Repositories\CustomerRepositoryInterface;
use App\Shop\Employees\Repositories\EmployeeRepository;
use App\Shop\Employees\Repositories\EmployeeRepositoryInterface;
use App\Shop\Products\Repositories\ProductRepository;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Provinces\Repositories\ProvinceRepository;
use App\Shop\Provinces\Repositories\ProvinceRepositoryInterface;
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

    $this->app->bind(
      CartRepositoryInterface::class,
      CartRepository::class,
    );

    $this->app->bind(
      AddressRepositoryInterface::class,
      AddressRepository::class,
    );

    $this->app->bind(
      ProvinceRepositoryInterface::class,
      ProvinceRepository::class,
    );

    $this->app->bind(
      CityRepositoryInterface::class,
      CityRepository::class,
    );
  }
}
