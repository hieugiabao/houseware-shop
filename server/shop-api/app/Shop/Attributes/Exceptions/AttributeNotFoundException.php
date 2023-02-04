<?php

namespace App\Shop\Attributes\Exceptions;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AttributeNotFoundException extends NotFoundHttpException
{
  /**
   * AttributeNotFoundException constructor.
   */
  public function __construct()
  {
    parent::__construct('Attribute not found.');
  }
}
