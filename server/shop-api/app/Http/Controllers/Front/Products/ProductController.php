<?php

namespace App\Http\Controllers\Front\Products;

use App\Http\Controllers\Controller;
use App\Shop\AttributeValues\Repositories\AttributeValueRepositoryInterface;
use App\Shop\ProductAttributes\ProductAttribute;
use App\Shop\ProductImages\ProductImageTransformable;
use App\Shop\Products\Exceptions\ProductUpdateErrorException;
use App\Shop\Products\Product;
use App\Shop\Products\Repositories\ProductRepository;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Products\Requests\CreateProductRequest;
use App\Shop\Products\Requests\UpdateProductRequest;
use App\Shop\Products\Requests\UploadProductImagesRequest;
use App\Shop\Products\Transformations\ProductTransformable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
  use ProductTransformable, ProductImageTransformable;

  /**
   * @var ProductRepositoryInterface
   */
  private $productRepo;

  /**
   * @var AttributeValueRepositoryInterface
   */
  private $attributeValueRepository;

  /**
   * Constructor
   *
   * @param ProductRepositoryInterface $productRepository
   */
  public function __construct(ProductRepositoryInterface $productRepository, AttributeValueRepositoryInterface $attributeValueRepository)
  {
    $this->productRepo = $productRepository;
    $this->attributeValueRepository = $attributeValueRepository;
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
    $product = $this->productRepo->findProductById($id);
    $productRepo = new ProductRepository($product);

    if ($request->has('attributeValue')) {
      $this->saveProductCombinations($request, $product);
    }

    $data = $request->except(
      '_token',
      '_method',
      'productAttributeQuantity',
      'default',
      'productAttributePrice',
      'attributeValue',
      'combination'
    );

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

  /**
   * @param Request $request
   * @param Product $product
   * @return RedirectResponse|bool
   */
  private function saveProductCombinations(Request $request, Product $product): bool
  {
    $fields = $request->only(
      'productAttributeQuantity',
      'productAttributePrice',
      'salePrice',
      'default'
    );

    if ($errors = $this->validateFields($fields)) {
      throw new ProductUpdateErrorException($errors->errors()->first());
    }

    $quantity = $fields['productAttributeQuantity'];
    $price = $fields['productAttributePrice'];

    $sale_price = null;
    if (isset($fields['salePrice'])) {
      $sale_price = $fields['salePrice'];
    }

    $attributeValues = $request->input('attributeValue');
    $productRepo = new ProductRepository($product);

    $hasDefault = $productRepo->listProductAttributes()->where('default', 1)->count();

    $default = 0;
    if ($request->has('default')) {
      $default = $fields['default'];
    }

    if ($default == 1 && $hasDefault > 0) {
      $default = 0;
    }

    $productAttribute = $productRepo->saveProductAttributes(
      new ProductAttribute(compact('quantity', 'price', 'sale_price', 'default'))
    );

    // save the combinations
    return collect($attributeValues)->each(function ($attributeValueId) use ($productRepo, $productAttribute) {
      $attribute = $this->attributeValueRepository->find($attributeValueId);
      return $productRepo->saveCombination($productAttribute, $attribute);
    })->count();
  }

  /**
   * @param array $data
   *
   * @return \Illuminate\Contracts\Validation\Validator|void
   */
  private function validateFields(array $data)
  {
    $validator = Validator::make($data, [
      'productAttributeQuantity' => 'required'
    ]);

    if ($validator->fails()) {
      return $validator;
    }
  }
}
