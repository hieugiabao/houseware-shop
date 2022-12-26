<?php

namespace App\Providers;

use App\Shop\Attributes\Repositories\AttributeRepository;
use App\Shop\Attributes\Repositories\AttributeRepositoryInterface;
use App\Shop\AttributeValues\Repositories\AttributeValueRepository;
use App\Shop\AttributeValues\Repositories\AttributeValueRepositoryInterface;
use App\Shop\Categories\Repositories\CategoryRepository;
use App\Shop\Categories\Repositories\CategoryRepositoryInterface;
use App\Shop\Customers\Repositories\CustomerRepository;
use App\Shop\Customers\Repositories\CustomerRepositoryInterface;
use App\Shop\Employees\Repositories\EmployeeRepository;
use App\Shop\Employees\Repositories\EmployeeRepositoryInterface;
use App\Shop\ProductAttributes\Repositories\ProductAttributeRepository;
use App\Shop\ProductAttributes\Repositories\ProductAttributeRepositoryInterface;
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
  }
}
