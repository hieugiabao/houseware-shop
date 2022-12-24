<?php

namespace App\Shop\Employees\Exceptions;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class EmployeeNotFoundException extends NotFoundHttpException
{
  /**
   * EmployeeNotFoundException constructor.
   */
  public function __construct(Throwable $e)
  {
    parent::__construct('Employee not found.', $e, 404);
  }
}
