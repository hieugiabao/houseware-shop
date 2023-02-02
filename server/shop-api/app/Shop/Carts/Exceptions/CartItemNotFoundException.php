<?php

namespace App\Shop\Carts\Exceptions;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CartItemNotFoundException extends NotFoundHttpException
{
  /**
   * CartItemNotFoundException constructor.
   */
  public function __construct()
  {
    parent::__construct('The cart item was not found.');
  }
}
