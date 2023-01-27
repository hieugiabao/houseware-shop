<?php

namespace App\Http\Controllers\Categories;

use App\Http\Controllers\Controller;
use App\Shop\Categories\Repositories\CategoryRepository;
use App\Shop\Categories\Repositories\CategoryRepositoryInterface;
use App\Shop\Categories\Transformations\CategoryTransformable;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  use CategoryTransformable;

  /**
   * @var CategoryRepositoryInterface
   */
  private $categoryRepository;

  /**
   * The constructor function is used to inject the CategoryRepositoryInterface into the CategoryController
   *
   * @param CategoryRepositoryInterface categoryRepository This is the interface that we created in the previous step.
   */
  public function __construct(CategoryRepositoryInterface $categoryRepository)
  {
    $this->categoryRepository = $categoryRepository;
  }

  /**
   * It returns a paginated list of categories
   *
   * @param Request request The request object
   *
   * @return A JSON response of the categories.
   */
  public function listCategories(Request $request)
  {
    $categories = $this->categoryRepository->listCategories();

    return response()->json(
      $this->categoryRepository->paginateArrayResults(
        $this->transformCategories($categories)->toArray(),
        $request->input('per_page', 10)
      )
    );
  }

  /**
   * It returns a JSON response of a category object from the database
   *
   * @param int id The id of the category you want to retrieve
   *
   * @return A JSON response.
   */
  public function getCategoryById(int $id)
  {
    $category = $this->categoryRepository->findCategoryById($id);

    return response()->json($this->transformCategory($category));
  }

  /**
   * It gets the products of a category by its id
   *
   * @param int id The id of the category
   *
   * @return A collection of products.
   */
  public function getProducts(int $id)
  {
    $category = $this->categoryRepository->findCategoryById($id);
    $categoryRepository = new CategoryRepository($category);
    $product = $categoryRepository->findProducts();

    return response()->json($this->categoryRepository->paginateArrayResults($product->toArray(), 10));
  }

  public function getChildCategories(int $id)
  {
    $category = $this->categoryRepository->findCategoryById($id);
    $categoryRepository = new CategoryRepository($category);
    $childCategories = $categoryRepository->findChildren();

    return response()->json($this->transformCategories($childCategories));
  }
}
