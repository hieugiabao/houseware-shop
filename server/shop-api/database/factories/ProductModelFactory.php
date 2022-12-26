<?php

use App\Shop\Products\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

/**
 * @var \Illuminate\Database\Eloquent\Factory $factory
 */
$factory->define(Product::class, function (Faker\Generator $faker) {
  $product = $faker->unique()->sentence;
  $file = UploadedFile::fake()->image('product.png', 600, 600);

  return [
    'name' => $product,
    'slug' => Str::slug($product),
    'description' => $faker->paragraph,
    'price' => $faker->randomFloat(2, 1, 100),
    'quantity' => $faker->numberBetween(5, 10),
    'price' => 10.00,
    'sku' => $this->faker->numberBetween(1111111, 999999),
    'status' => 1,
    'weight' => 5,
    'thumb' => $file->getFilename() . '.' . $file->getClientOriginalExtension(),
    'mass_unit' => 'gms'
  ];
});
