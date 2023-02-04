<?php

return [
  'shipping_token' => env('SHIPPING_API_TOKEN'),
  'name' => env('SHOP_NAME', 'Houseware'),
  'country' => env('SHOP_COUNTRY_ISO', 'VN'),
  'country_id' => env('SHOP_COUNTRY_ID', 226),
  'weight' => env('SHOP_WEIGHT', 'lbs'),
  'email' => env('SHOP_EMAIL', 'youhubvippro@gmail.com'),
  'phone' => env('SHOP_PHONE', '0976342312'),
  'warehouse' => [
    'address_1' => '1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
    'address_2' => '',
    'city' => 'Hà Nội',
    'country' => 'VN',
    'zip' => '100000',
  ]
];
