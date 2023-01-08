<?php

namespace App\Shop\Carts\Repositories;

use App\Shop\Carts\Cart;
use Jsdecena\Baserepo\BaseRepositoryInterface;

interface CartRepositoryInterface extends BaseRepositoryInterface
{
  public function addToCart(array $params): Cart;

  public function updateCart(array $params): Cart;

  public function deleteCartItem(): bool;

  public function findCartItemByPk(int $product_id, int $customer_id): Cart;
}
