<?php

namespace App\Shop\Provinces;

use App\Shop\Cities\City;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name'
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [];

  public function cities()
  {
    return $this->hasMany(City::class);
  }
}
