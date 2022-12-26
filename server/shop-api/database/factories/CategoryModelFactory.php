<?php

use App\Shop\Categories\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

/**
 * @var \Illuminate\Database\Eloquent\Factory $factory
 *
 */
$factory->define(Category::class, function (Faker\Generator $faker) {
  $name = $faker->unique()->randomElement([
    'Gear',
    'Clothing',
    'Shoes',
    'Diapering',
    'Feeding',
    'Bath',
    'Toys',
    'Nursery',
    'Household',
    'Grocery'
  ]);

  $file = UploadedFile::fake()->image('category.png', 600, 600);

  return [
    'name' => $name,
    'slug' => Str::slug($name),
    'description' => $faker->paragraph,
    'thumb' => $file->store('categories', ['disk' => 'public']),
    'status' => 1
  ];
});
