<?php

namespace App\Shop\Products\Requests;

use App\Shop\Base\BaseFormRequest;

class UploadProductImagesRequest extends BaseFormRequest
{
  /**
   * @return array
   */
  public function rules()
  {
    return [
      'images' => 'required|array',
      'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ];
  }
}
