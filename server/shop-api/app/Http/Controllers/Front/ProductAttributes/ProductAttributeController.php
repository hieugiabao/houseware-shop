<?php

namespace App\Http\Controllers\Front\ProductAttributes;

use App\Http\Controllers\Controller;
use App\Shop\AttributeValues\AttributeValue;
use App\Shop\ProductAttributes\ProductAttribute;
use App\Shop\ProductAttributes\Repositories\ProductAttributeRepositoryInterface;
use App\Shop\ProductImages\ProductImageTransformable;
use App\Shop\Products\Product;
use App\Shop\Products\Repositories\ProductRepository;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Products\Transformations\ProductTransformable;

class ProductAttributeController extends Controller
{
  use ProductTransformable, ProductImageTransformable;
  /**
   * @var ProductAttributeRepositoryInterface
   *
   */
  private $productAttributeRepository;

  /**
   * @var ProductRepositoryInterface
   */
  private $productRepository;

  /**
   * ProductAttributesController constructor.
   *
   * @param ProductAttributeRepositoryInterface $productAttributeRepository
   * @param ProductRepositoryInterface $productRepository
   */
  public function __construct(
    ProductAttributeRepositoryInterface $productAttributeRepository,
    ProductRepositoryInterface $productRepository
  ) {
    $this->productAttributeRepository = $productAttributeRepository;
    $this->productRepository = $productRepository;
  }

  public function getProductAttributes($productId)
  {
    $product = $this->productRepository->findProductById($productId);
    $productRepository = new ProductRepository($product);
    $productAttributes = $productRepository->listProductAttributes();

    $product = $this->transformProduct($product);

    $productAttributes = $productAttributes->map(function (ProductAttribute $productAttribute) use ($product) {
      $attributesValues = $productAttribute->attributesValues()->get()->map(function (AttributeValue $attributeValue) {
        return [
          'id' => $attributeValue->id,
          'attribute' => $attributeValue->attribute()->first(),
          'value' => $attributeValue->value
        ];
      });

      $productAttribute->attributesValues = $attributesValues;
      return $productAttribute;
    });
    $images = $productRepository->findProductImages();
    $product->images = $this->transformProductImages($images);
    $product->productAttributes = $productAttributes;

    return response()->json($product, 200);
  }
}
