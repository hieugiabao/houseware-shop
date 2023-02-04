<?php

namespace App\Shop\Customers;

use App\Shop\Addresses\Address;
use App\Shop\Carts\Cart;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Nicolaslopezj\Searchable\SearchableTrait;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Customer extends Authenticatable implements JWTSubject
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

  /**
   * Get the identifier that will be stored in the subject claim of the JWT.
   *
   * @return mixed
   */
  public function getJWTIdentifier()
  {
    return $this->getKey();
  }
  /**
   * Return a key value array, containing any custom claims to be added to the JWT.
   *
   * @return array
   */
  public function getJWTCustomClaims()
  {
    return [];
  }

  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function addresses()
  {
    return $this->hasMany(Address::class)->whereStatus(true);
  }

  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function orders()
  {
    return $this->hasMany(Order::class);
  }
}
