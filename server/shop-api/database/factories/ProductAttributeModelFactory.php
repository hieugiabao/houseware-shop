<?php

use App\Shop\ProductAttributes\ProductAttribute;

/** @var \Illuminate\Database\Eloquent\Factory $factory
 *
 */
$factory->define(ProductAttribute::class, function (Faker\Generator $faker) {
  return [
    'quantity' => 1,
    'price' => 1.55
  ];
});
