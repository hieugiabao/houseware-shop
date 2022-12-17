<?php

namespace App\Shop\Products\Repositories;

use App\Shop\Products\Exceptions\ProductCreateErrorException;
use App\Shop\Products\Exceptions\ProductNotFoundException;
use App\Shop\Products\Exceptions\ProductUpdateErrorException;
use App\Shop\Products\Product;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Products\Transformations\ProductTransformable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepository;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
  use ProductTransformable;

  /**
   * @var Product $model
   */
  protected $model;

  /**
   * Constructor.
   *
   * @param Product $product
   */
  public function __construct(Product $product)
  {
    parent::__construct($product);
    $this->model = $product;
  }

  /**
   * List all the products
   *
   * @param string $order
   * @param string $sort
   * @param array $columns
   * @return Collection
   */
  public function listProducts(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Collection
  {
    return $this->all($columns, $order, $sort);
  }

  /**
   * Create the product
   *
   * @param array $data
   *
   * @return Product
   * @throws ProductCreateErrorException
   */
  public function createProduct(array $data): Product
  {
    try {
      return $this->create($data);
    } catch (QueryException $e) {
      throw new ProductCreateErrorException($e->getMessage(), 500, $e);
    }
  }

  /**
   * Update the product
   *
   * @param array $data
   *
   * @return bool
   * @throws ProductUpdateErrorException
   */
  public function updateProduct(array $data): bool
  {
    $filtered = collect($data)->all();

    try {
      return $this->model->where('id', $this->model->id)->update($filtered);
    } catch (QueryException $e) {
      throw new ProductUpdateErrorException($e->getMessage(), 500, $e);
    }
  }

  /**
   * Find the product by ID
   *
   * @param int $id
   *
   * @return Product
   * @throws ProductNotFoundException
   */
  public function findProductById(int $id): Product
  {
    try {
      return $this->transformProduct($this->findOneOrFail($id));
    } catch (ModelNotFoundException $e) {
      throw new ProductNotFoundException($e->getMessage(), 404, $e);
    }
  }

  /**
   * Delete the product
   *
   * @param Product $product
   *
   * @return bool
   * @throws \Exception
   * @deprecated
   * @use removeProduct
   */
  public function deleteProduct(Product $product): bool
  {
    return $product->delete();
  }

  /**
   * @return bool
   * @throws \Exception
   */
  public function removeProduct(): bool
  {
    return $this->model->where('id', $this->model->id)->delete();
  }

  /**
   * Get the product via slug
   *
   * @param array $slug
   *
   * @return Product
   * @throws ProductNotFoundException
   */
  public function findProductBySlug(array $slug): Product
  {
    try {
      return $this->findOneByOrFail($slug);
    } catch (ModelNotFoundException $e) {
      throw new ProductNotFoundException($e->getMessage(), 404, $e);
    }
  }

  /**
   * @param string $query
   *
   * @return mixed
   */
  public function searchProduct(string $query): Collection
  {
    if (!empty($query)) {
      return $this->model->searchProduct($query);
    } else {
      return $this->listProducts();
    }
  }
}
