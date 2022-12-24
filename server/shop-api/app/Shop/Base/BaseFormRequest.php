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

    $exception = new ValidationException($validator);
    $errors = $exception->errors();
    throw new HttpResponseException(response()->json(
      new ApiError(
        422,
        $exception->getMessage(),
        $exception->getTraceAsString(),
        $this->getPathInfo(),
        $errors
      ),
      JsonResponse::HTTP_UNPROCESSABLE_ENTITY
    ));
  }
}
