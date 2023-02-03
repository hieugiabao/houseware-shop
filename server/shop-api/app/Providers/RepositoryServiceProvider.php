<?php

namespace App\Providers;

use App\Shop\Addresses\Repositories\AddressRepository;
use App\Shop\Addresses\Repositories\AddressRepositoryInterface;
use App\Shop\Attributes\Repositories\AttributeRepository;
use App\Shop\Attributes\Repositories\AttributeRepositoryInterface;
use App\Shop\AttributeValues\Repositories\AttributeValueRepository;
use App\Shop\AttributeValues\Repositories\AttributeValueRepositoryInterface;
use App\Shop\Carts\Repositories\CartRepository;
use App\Shop\Carts\Repositories\CartRepositoryInterface;
use App\Shop\Categories\Repositories\CategoryRepository;
use App\Shop\Categories\Repositories\CategoryRepositoryInterface;
use App\Shop\Cities\Repositories\CityRepository;
use App\Shop\Cities\Repositories\CityRepositoryInterface;
use App\Shop\Couriers\Repositories\CourierRepository;
use App\Shop\Couriers\Repositories\CourierRepositoryInterface;
use App\Shop\Customers\Repositories\CustomerRepository;
use App\Shop\Customers\Repositories\CustomerRepositoryInterface;
use App\Shop\Employees\Repositories\EmployeeRepository;
use App\Shop\Employees\Repositories\EmployeeRepositoryInterface;
use App\Shop\Orders\Repositories\OrderRepository;
use App\Shop\Orders\Repositories\OrderRepositoryInterface;
use App\Shop\OrderStatuses\Repositories\OrderStatusRepository;
use App\Shop\OrderStatuses\Repositories\OrderStatusRepositoryInterface;
use App\Shop\ProductAttributes\Repositories\ProductAttributeRepository;
use App\Shop\ProductAttributes\Repositories\ProductAttributeRepositoryInterface;
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

    $this->app->bind(
      AttributeRepositoryInterface::class,
      AttributeRepository::class,
    );

    $this->app->bind(
      AttributeValueRepositoryInterface::class,
      AttributeValueRepository::class,
    );

    $this->app->bind(
      ProductAttributeRepositoryInterface::class,
      ProductAttributeRepository::class,
    );

    $this->app->bind(
      CourierRepositoryInterface::class,
      CourierRepository::class,
    );

    $this->app->bind(
      OrderRepositoryInterface::class,
      OrderRepository::class,
    );

    $this->app->bind(
      OrderStatusRepositoryInterface::class,
      OrderStatusRepository::class,
    );
  }
}
