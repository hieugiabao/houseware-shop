<?php

namespace App\Shop\Carts\Exceptions;

class UpdateCartErrorException extends \Exception
{
  public static function couldNotUpdateCart()
  {
    return new static('Could not update cart');
  }
}
