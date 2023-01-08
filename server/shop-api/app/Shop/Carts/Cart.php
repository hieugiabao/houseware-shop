<?php

namespace App\Shop\Carts;

use App\Shop\Customers\Customer;
use App\Shop\Products\Product;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'quantity'
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [];

  /**
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function customer()
  {
    return $this->belongsTo(Customer::class);
  }

  /**
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function product()
  {
    return $this->belongsTo(Product::class);
  }
}
