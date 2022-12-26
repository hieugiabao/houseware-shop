<?php

use App\Shop\Employees\Employee;

/**
 * @var \Illuminate\Database\Eloquent\Factory $factory
 */
$factory->define(Employee::class, function (Faker\Generator $faker) {
  static $password;

  return [
    'name' => $faker->firstName,
    'email' => $faker->unique()->safeEmail,
    'password' => $password ?: $password = bcrypt('supersecret'),
    'status' => 1
  ];
});
