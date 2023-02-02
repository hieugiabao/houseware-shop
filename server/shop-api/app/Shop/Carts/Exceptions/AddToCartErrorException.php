<?php

namespace App\Shop\Carts\Exceptions;

class AddToCartErrorException extends \Exception
{
  public static function couldNotCreateCart()
  {
    return new static('Could not create cart');
  }
}
