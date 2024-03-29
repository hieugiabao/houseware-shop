<?php

namespace App\Shop\Employees\Requests;

use App\Shop\Base\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends BaseFormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'name' => ['required'],
      'email' => ['required', 'email', Rule::unique('employees', 'email')->ignore($this->segment(3))]
    ];
  }
}
