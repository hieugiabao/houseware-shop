<?php

namespace App\Shop\Categories\Transformations;

use App\Shop\Categories\Category;
use Illuminate\Support\Collection;

trait CategoryTransformable
{
  /**
   * Transform the category
   *
   * @param Category $category
   * @return Category
   */
  protected function transformCategory(Category $category)
  {
    $property = new Category();
    $property->id = (int) $category->id;
    $property->name = $category->name;
    $property->slug = $category->slug;
    $property->description = $category->description;
    $property->parent_id = $category->parent_id;
    $property->status =  $category->status;
    $property->thumb = $category->thumb ? asset("storage/$category->thumb") : null;
    $property->created_at = $category->created_at;
    $property->updated_at = $category->updated_at;

    return $property;
  }

  /**
   * Transform the collection
   *
   * @param Collection $categories
   * @return Category
   */
  protected function transformCategories(Collection $categories)
  {
    return $categories->map(function (Category $category) {
      return $this->transformCategory($category);
    });
  }
}
