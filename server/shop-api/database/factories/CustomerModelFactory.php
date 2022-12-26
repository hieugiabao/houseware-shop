<?php

use App\Shop\Customers\Customer;

/**
 * @var \Illuminate\Database\Eloquent\Factory $factory
 */
$factory->define(Customer::class, function (Faker\Generator $faker) {
  static $password;

  return [
    'name' => $faker->firstName,
    'email' => $faker->unique()->safeEmail,
    'password' => $password ?: $password = bcrypt('secret'),
    'status' => 1,
  ];
});
