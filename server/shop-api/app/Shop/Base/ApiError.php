<?php

namespace App\Shop\Base;

class ApiError
{
  /**
   * @var int
   */
  public $statusCode;

  /**
   * @var string
   */
  public $message;

  /**
   * @var array
   */
  public $errors;

  /**
   * @var string
   */
  public $path;

  /**
   * @var string
   */
  public $trace;

  /**
   * ApiError constructor.
   *
   * @param int $statusCode
   * @param string $message
   * @param array $errors
   * @param string $trace
   * @param string $path
   *
   */
  public function __construct(int $statusCode, string $message, string $trace = '', string $path = '/', array $errors = [])
  {
    $this->statusCode = $statusCode;
    $this->message = $message;
    $this->errors = $errors;
    $this->trace = $trace;
    $this->path = $path;
  }
}
