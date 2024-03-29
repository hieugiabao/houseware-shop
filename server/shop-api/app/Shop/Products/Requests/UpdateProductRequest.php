<?php

namespace App\Shop\Products\Requests;

use App\Shop\Base\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends BaseFormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'sku' => ['required'],
      'name' => ['required', Rule::unique('products')->ignore($this->segment(3))],
      'quantity' => ['required', 'integer', 'min:0'],
      'price' => ['required', 'numeric', 'min:0'],
      'weight' => ['nullable', 'numeric', 'min:0'],
      'thumb' => 'image|max:2048',
      'image' => 'nullable|array',
    ];
  }
}
