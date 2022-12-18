<?php

namespace App\Shop\Products\Repositories;

use App\Shop\Products\Product;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepositoryInterface;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
  public function listProducts(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Collection;

  public function createProduct(array $data): Product;

  public function updateProduct(array $data): Product;

  public function findProductById(int $id): Product;

  public function deleteProduct(Product $product): bool;

  public function removeProduct(): bool;

  public function findProductBySlug(array $slug): Product;

  public function searchProduct(string $text): Collection;

  public function detachCategories();

  public function syncCategories(array $params);
}
