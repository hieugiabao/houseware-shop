<?php

namespace App\Shop\ProductImages;

use Jsdecena\Baserepo\BaseRepository;
use App\Shop\Products\Product;

class ProductImageRepository extends BaseRepository
{

  /**
   * @var ProductImage
   *
   */
  protected $model;

  /**
   * ProductImageRepository constructor.
   * @param ProductImage $productImage
   */
  public function __construct(ProductImage $productImage)
  {
    parent::__construct($productImage);
    $this->model = $productImage;
  }

  /**
   * @return mixed
   */
  public function findProduct(): Product
  {
    return $this->model->product;
  }
}
