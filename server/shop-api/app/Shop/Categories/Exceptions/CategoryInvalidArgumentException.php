<?php

namespace App\Shop\Categories\Exceptions;

use Doctrine\Instantiator\Exception\InvalidArgumentException;

class CategoryInvalidArgumentException extends InvalidArgumentException
{
  public static function emptyField(string $field)
  {
    return new static("The field `{$field}` is required");
  }
}
