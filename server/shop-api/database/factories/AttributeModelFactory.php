<?php

use App\Shop\Attributes\Attribute;

/**
 * @var \Illuminate\Database\Eloquent\Factory $factory
 */
$factory->define(Attribute::class, function (Faker\Generator $faker) {
  return [
    'name' => $faker->unique()->word
  ];
});
