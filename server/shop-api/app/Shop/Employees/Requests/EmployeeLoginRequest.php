<?php

namespace App\Shop\Employees\Requests;

use App\Shop\Base\BaseFormRequest;

class EmployeeLoginRequest extends BaseFormRequest
{

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'email' => ['required', 'email'],
      'password' => ['required', 'min:8']
    ];
  }
}
