<?php

namespace App\Shop\Customers;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Nicolaslopezj\Searchable\SearchableTrait;

class Customer extends Authenticatable
{
  use Notifiable, SoftDeletes, SearchableTrait;

  /**
   * The attributes that are mass assignable
   *
   * @var array
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'status',
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * @var array
   */
  protected $dates = ['deleted_at'];

  /**
   * Searchable rules
   *
   * @var array
   */
  protected $searchable = [
    'columns' => [
      'customer.name' => 10,
      'customer.email' => 5
    ]
  ];

  /**
   * @param mixed $term
   *
   * @return mixed
   */
  public function searchCustomer($term)
  {
    return self::search($term);
  }
}
