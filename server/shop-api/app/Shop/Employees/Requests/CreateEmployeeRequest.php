<?php

namespace App\Shop\Employees\Requests;

use App\Shop\Base\BaseFormRequest;

class CreateEmployeeRequest extends BaseFormRequest
{

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'name' => ['required'],
      'email' => ['required', 'email', 'unique:employees'],
      'password' => ['required', 'min:8', 'confirmed'],
    ];
  }
}
