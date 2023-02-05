<?php

namespace App\Shop\Customers\Requests;

use App\Shop\Base\BaseFormRequest;

class ChangePasswordRequest extends BaseFormRequest
{

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'current_password' => ['required', 'string'],
      'password' => ['required', 'string', 'min:8', 'confirmed'],
    ];
  }
}
