<?php

use App\Shop\AttributeValues\AttributeValue;

/**
 * @var \Illuminate\Database\Eloquent\Factory $factory
 */
$factory->define(AttributeValue::class, function (Faker\Generator $faker) {
  return [
    'value' => $faker->unique()->word,
  ];
});
