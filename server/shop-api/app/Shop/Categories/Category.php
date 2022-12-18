<?php

namespace App\Shop\Categories;

use App\Shop\Products\Product;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Category extends Model
{
  use NodeTrait;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name',
    'slug',
    'description',
    'thumb',
    'status',
    'parent_id'
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [];

  /**
   * The attributes that should be cast to native types.
   *
   */
  public function products()
  {
    return $this->belongsToMany(Product::class);
  }
}
