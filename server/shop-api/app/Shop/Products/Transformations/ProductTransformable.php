<?php

namespace App\Shop\Products\Transformations;

use App\Shop\Products\Product;

trait ProductTransformable
{
  /**
   * Transform the product
   *
   * @param Product $product
   * @return Product
   */
  protected function transformProduct(Product $product)
  {
    $prod = new Product;
    $prod->id = (int) $product->id;
    $prod->name = $product->name;
    $prod->sku = $product->sku;
    $prod->slug = $product->slug;
    $prod->description = $product->description;
    $prod->thumb = $product->thumb ? config('filesystems.disks.s3.url') . '/' . $product->thumb : null;
    $prod->quantity = $product->quantity;
    $prod->price = $product->price;
    $prod->sale_price = $product->sale_price;
    $prod->sale_percentage = $product->sale_percentage;
    $prod->status = $product->status;
    $prod->weight = (float) $product->weight;
    $prod->mass_unit = $product->mass_unit;
    $prod->categories = $product->categories()->get();
    $prod->created_at = $product->created_at;
    $prod->updated_at = $product->updated_at;

    return $prod;
  }
}
