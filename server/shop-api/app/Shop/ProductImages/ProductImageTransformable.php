<?php

namespace App\Shop\ProductImages;

use Illuminate\Support\Collection;

trait ProductImageTransformable
{
  /**
   * Transform the product image
   *
   * @param ProductImage $product_image
   *
   * @return ProductImage
   */
  protected function transformProductImage(ProductImage $product_image)
  {
    $prototype = new ProductImage;
    $prototype->id = (int) $product_image->id;
    $prototype->src = config('filesystems.disks.s3.url') . '/' . $product_image->src;

    return $prototype;
  }

  /**
   * Transform the collection of product images
   *
   * @param Collection $product_images
   * @return Collection
   */
  protected function transformProductImages(Collection $product_images)
  {
    return $product_images->map(function (ProductImage $product_image) {
      return $this->transformProductImage($product_image);
    });
  }
}
