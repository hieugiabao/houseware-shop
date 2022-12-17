<?php

namespace App\Shop\Base;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

abstract class BaseFormRequest extends FormRequest
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

  protected function failedValidation(Validator $validator)
  {

    $errors = (new ValidationException($validator))->errors();
    throw new HttpResponseException(response()->json(
      [
        'errors' => $errors,
        'statusCode' => 422,
      ],
      JsonResponse::HTTP_UNPROCESSABLE_ENTITY
    ));
  }
}
