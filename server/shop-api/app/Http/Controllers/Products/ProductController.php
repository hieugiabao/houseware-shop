<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Shop\AttributeValues\Repositories\AttributeValueRepositoryInterface;
use App\Shop\Products\Product;
use App\Shop\Products\Repositories\ProductRepository;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Products\Requests\CreateProductRequest;
use App\Shop\Products\Requests\UpdateProductRequest;
use App\Shop\Products\Transformations\ProductTransformable;
use Illuminate\Support\Str;

class ProductController extends Controller
{
  use ProductTransformable;

  /**
   * @var ProductRepositoryInterface
   */
  private $productRepo;

  /**
   * @var AttributeValueRepositoryInterface
   *
   */
  private $attributeValueRepo;

  /**
   * Constructor
   *
   * @param ProductRepositoryInterface $productRepository
   * @param AttributeValueRepositoryInterface $attributeValueRepository
   */
  public function __construct(ProductRepositoryInterface $productRepository, AttributeValueRepositoryInterface $attributeValueRepository)
  {
    $this->productRepo = $productRepository;
    $this->attributeValueRepo = $attributeValueRepository;
  }

  /**
   * Get all product pagination
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function getPaginationProducts()
  {
    $list = $this->productRepo->listProducts('id');

    if (request()->has('query') && request()->input('query') != '') {
      $list = $this->productRepo->searchProduct(request()->input('query'));
    }

    $products = $list->map(function (Product $item) {
      return $this->transformProduct($item);
    })->all();

    $result = collect($this->productRepo->paginateArrayResults($products, request()->input('per_page', 10)))->except(
      'first_page_url',
      'last_page_url',
      'links',
      'next_page_url',
      'prev_page_url',
    );
    return response()->json(
      $result,
      200
    );
  }

  /**
   * Create a new product
   *
   * @param CreateProductRequest $request
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function createProduct(CreateProductRequest $request)
  {
    $product = $this->productRepo->createProduct($request->except('_token', '_method'));
    return response()->json($this->transformProduct($product), 201);
  }

  /**
   * Update the product
   *
   * @param int $id
   * @param UpdateProductRequest $request
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function updateProduct(UpdateProductRequest $request, int $id)
  {
    $data = $request->except(
      '_token',
      '_method',
    );
    $product = $this->productRepo->findProductById($id);

    $productRepo = new ProductRepository($product, $this->attributeValueRepo);

    if ($request->hasFile('thumb')) {
      $data['thumb'] = $productRepo->uploadOne($request->thumb, 'products');
    }

    $product = $productRepo->updateProduct($data);

    return response()->json($this->transformProduct($product), 200);
  }

  public function removeProduct(int $id)
  {
    $product = $this->productRepo->findProductById($id);

    $productRepo = new ProductRepository($product, $this->attributeValueRepo);
    $productRepo->removeProduct();

    return response()->json($this->transformProduct($product), 200);
  }
}
