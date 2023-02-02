<?php

namespace App\Shop\Carts\Requests;

use App\Shop\Base\BaseFormRequest;

class UpdateCartRequest extends BaseFormRequest
{
  public function rules()
  {
    return [
      'product_id' => 'required|integer',
      'quantity' => 'required|integer'
    ];
  }
}
