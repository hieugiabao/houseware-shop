<?php

namespace App\Shop\PaymentMethods;

use Illuminate\Http\Request;

interface PaymentRepositoryInterface
{
  public function execute(Request $request);
}
