<?php

namespace App\Shop\Products;

use App\Shop\Categories\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Nicolaslopezj\Searchable\SearchableTrait;

class Product extends Model
{
  use SearchableTrait;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'sku',
    'name',
    'description',
    'thumb',
    'quantity',
    'price',
    'status',
    'weight',
    'mass_unit',
    'status',
    'length',
    'width',
    'height',
    'distance_unit',
    'slug',
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [];

  /**
   * Searchable rules.
   *
   * @var array
   */
  protected $searchable = [
    'columns' => [
      'products.name' => 10,
      'products.description' => 5
    ]
  ];

  /**
   * @param string $term
   * @return Collection
   */
  public function searchProduct(string $term): Collection
  {
    return self::search($term)->get();
  }

  public function categories()
  {
    return $this->belongsToMany(Category::class);
  }
}
