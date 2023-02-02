<?php

namespace App\Http\Controllers\Front\Products;

use App\Http\Controllers\Controller;
use App\Shop\ProductImages\ProductImageTransformable;
use App\Shop\Products\Product;
use App\Shop\Products\Repositories\ProductRepository;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Products\Requests\CreateProductRequest;
use App\Shop\Products\Requests\UpdateProductRequest;
use App\Shop\Products\Requests\UploadProductImagesRequest;
use App\Shop\Products\Transformations\ProductTransformable;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
  use ProductTransformable, ProductImageTransformable;

  /**
   * @var ProductRepositoryInterface
   */
  private $productRepo;

  /**
   * Constructor
   *
   * @param ProductRepositoryInterface $productRepository
   */
  public function __construct(ProductRepositoryInterface $productRepository)
  {
    $this->productRepo = $productRepository;
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

  public function getBestSellerProducts()
  {
    $products = $this->productRepo->bestSellerProducts();
    $products = $products->map(function (Product $item) {
      return $this->transformProduct($item);
    })->all();

    $result = collect($this->productRepo->paginateArrayResults($products, request()->input('per_page', 10)))->all();

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

    $productRepo = new ProductRepository($product);

    $product = $productRepo->updateProduct($data);

    return response()->json($this->transformProduct($product), 200);
  }

  public function removeProduct(int $id)
  {
    $product = $this->productRepo->findProductById($id);

    $productRepo = new ProductRepository($product);
    $productRepo->removeProduct();

    return response()->json($this->transformProduct($product), 200);
  }

  /**
   * Get list of the product images
   *
   * @param int $id
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function getProductImages(int $id)
  {
    $product = $this->productRepo->findProductById($id);
    $productRepository = new ProductRepository($product);

    $images = $productRepository->findProductImages();

    return response()->json($this->transformProductImages($images), 200);
  }

  /**
   * Upload product image
   *
   * @param int $id
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function getProductById(int $id)
  {
    $product = $this->productRepo->findProductById($id);
    return response()->json($this->transformProduct($product), 200);
  }

  public function uploadImages(int $id, UploadProductImagesRequest $request)
  {
    $product = $this->productRepo->findProductById($id);
    $productRepository = new ProductRepository($product);

    $productRepository->saveProductImages(collect($request->file('images')));

    return response()->json(null, 201);
  }
}
