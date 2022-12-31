<?php

namespace App\Shop\Customers\Requests;

use App\Shop\Base\BaseFormRequest;

class LoginCustomerRequest extends BaseFormRequest
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
      'password' => ['required']
    ];
  }
}
