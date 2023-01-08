<?php

namespace App\Shop\Carts\Repositories;

use App\Shop\Carts\Cart;
use App\Shop\Carts\Exceptions\AddToCartErrorException;
use App\Shop\Carts\Exceptions\CartItemNotFoundException;
use App\Shop\Carts\Exceptions\UpdateCartErrorException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepository;

class CartRepository extends BaseRepository implements CartRepositoryInterface
{
  /**
   * @var Cart $model
   */
  protected $model;

  /**
   * CartRepository constructor.
   * @param Cart $cart
   */
  public function __construct(Cart $cart)
  {
    parent::__construct($cart);
    $this->model = $cart;
  }

  /**
   * @param array $params
   * @return Cart
   */
  public function addToCart(array $params): Cart
  {
    try {
      $cart = new Cart([
        'quantity' => $params['quantity'],
      ]);
      $cart->customer()->associate($params['customer_id']);
      $cart->product()->associate($params['product_id']);

      $cart->save();

      return $cart;
    } catch (QueryException $e) {
      throw new AddToCartErrorException($e->getMessage(), 500, $e);
    }
  }

  /**
   * @param array $params
   * @return Cart
   */
  public function updateCart(array $params): Cart
  {
    try {
      $this->model->where('product_id', $this->model->product_id)->where('customer_id', $this->model->customer_id)->update($params);

      return $this->model;
    } catch (QueryException $e) {
      throw new UpdateCartErrorException($e->getMessage(), 500, $e);
    }
  }

  /**
   * @return bool
   */
  public function deleteCartItem(): bool
  {
    return $this->model->where('product_id', $this->model->product_id)->where('customer_id', $this->model->customer_id)->delete();
  }

  /**
   * @param int $product_id
   * @param int $customer_id
   * @return Cart
   */
  public function findCartItemByPk(int $product_id, int $customer_id): Cart
  {
    try {
      return $this->model->where('product_id', $product_id)->where('customer_id', $customer_id)->firstOrFail();
    } catch (ModelNotFoundException $e) {
      throw new CartItemNotFoundException($e->getMessage(), 404, $e);
    }
  }
}
