<?php

namespace App\Shop\Carts\Requests;

use App\Shop\Base\BaseFormRequest;

class RemoveToCartRequest extends BaseFormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'product_ids' => ['required', 'array']
    ];
  }
}
