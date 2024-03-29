<?php

namespace App\Shop\Products\Repositories;

use App\Shop\AttributeValues\AttributeValue;
use App\Shop\Base\ApiError;
use App\Shop\ProductAttributes\ProductAttribute;
use App\Shop\ProductImages\ProductImage;
use App\Shop\Products\Exceptions\ProductCreateErrorException;
use App\Shop\Products\Exceptions\ProductNotFoundException;
use App\Shop\Products\Exceptions\ProductUpdateErrorException;
use App\Shop\Products\Product;
use App\Shop\Products\Repositories\ProductRepositoryInterface;
use App\Shop\Products\Transformations\ProductTransformable;
use App\Shop\Tools\UploadableTrait;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Jsdecena\Baserepo\BaseRepository;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
  use ProductTransformable, UploadableTrait;

  /**
   * @var Product $model
   */
  protected $model;

  /**
   * Constructor.
   *
   * @param Product $product
   */
  public function __construct(Product $product)
  {
    parent::__construct($product);
    $this->model = $product;
  }

  /**
   * List all the products
   *
   * @param string $order
   * @param string $sort
   * @param array $columns
   * @return Collection
   */
  public function listProducts(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Collection
  {
    return $this->all($columns, $order, $sort);
  }

  public function bestSellerProducts(): Collection
  {
    $products = Product::where('sale_percentage', '>', 0)->orderBy('sale_percentage', 'desc')->limit(50)->get();
    if (count($products) < 0) {
      $products = $this->listProducts('updated_at', 'desc', ['*']);
    } else {
      $more_products = $this->listProducts('updated_at', 'desc', ['*']);
      $products = $products->merge($more_products);
    }

    return $products;
  }


  /**
   * Create the product
   *
   * @param array $data
   *
   * @return Product
   * @throws ProductCreateErrorException
   */
  public function createProduct(array $data): Product
  {
    try {
      $collection = collect($data);
      $slug = (isset($data['name'])) ? Str::slug($data['name']) : '';

      $merge = $collection->merge(compact('slug'));

      $product = new Product($merge->all());

      if (isset($data['categories'])) {
        $this->model->categories()->sync($data['categories']);
      } else {
        $this->model->categories()->detach();
      }

      $product->save();
      return $product;
    } catch (QueryException $e) {
      throw new ProductCreateErrorException($e->getMessage(), 500, $e);
    }
  }

  /**
   * Update the product
   *
   * @param array $data
   *
   * @return Product
   * @throws ProductUpdateErrorException
   */
  public function updateProduct(array $data): Product
  {

    try {
      $product = $this->findProductById($this->model->id);
      $productRepo = new ProductRepository($product);

      $collection = collect($data)->except(
        '_token',
        'categories',
        '_method',
        'default',
      );
      $slug = Str::slug($collection->get('name'));

      if (isset($data['thumb']) && ($data['thumb'] instanceof UploadedFile)) {
        if ($product->thumb != null) {
          $this->deletefile($product->thumb);
        }
        $thumb = $this->uploadOne($data['thumb'], 'products/thumbnails');
        $merge = $collection->merge(compact('thumb', 'slug'));
      } else {
        $merge = $collection->merge(compact('slug'));
      }

      if (isset($data['categories'])) {
        $this->syncCategories($data['categories']);
      } else {
        $this->detachCategories();
      }

      if (isset($data['sale_price']) && $data['sale_price'] > 0) {
        $sale_percentage = round((($product->price - $data['sale_price']) / $product->price) * 100);
        $merge = $merge->merge(compact('sale_percentage'));
      }

      $product->update($merge->all());
      return $product;
    } catch (QueryException $e) {
      throw new ProductUpdateErrorException($e->getMessage(), 500, $e);
    }
  }

  /**
   * Find the product by ID
   *
   * @param int $id
   *
   * @return Product
   * @throws ProductNotFoundException
   */
  public function findProductById(int $id): Product
  {
    try {
      return $this->findOneOrFail($id);
    } catch (ModelNotFoundException $e) {
      throw new ProductNotFoundException($e->getMessage(), 404, $e);
    }
  }

  /**
   * Delete the product
   *
   * @param Product $product
   *
   * @return bool
   * @throws \Exception
   * @deprecated
   * @use removeProduct
   */
  public function deleteProduct(Product $product): bool
  {
    return $product->delete();
  }

  /**
   * @return bool
   * @throws \Exception
   */
  public function removeProduct(): bool
  {
    return $this->model->where('id', $this->model->id)->delete();
  }

  /**
   * Get the product via slug
   *
   * @param array $slug
   *
   * @return Product
   * @throws ProductNotFoundException
   */
  public function findProductBySlug(array $slug): Product
  {
    try {
      return $this->findOneByOrFail($slug);
    } catch (ModelNotFoundException $e) {
      throw new ProductNotFoundException($e->getMessage(), 404, $e);
    }
  }

  /**
   * @param string $query
   *
   * @return mixed
   */
  public function searchProduct(string $query): Collection
  {
    if (!empty($query)) {
      return $this->model->searchProduct($query);
    } else {
      return $this->listProducts();
    }
  }

  /**
   * Sync the categories
   *
   * @param array $params
   */
  public function syncCategories(array $params)
  {
    $this->model->categories()->sync($params);
  }

  /**
   * Detach the categories
   */
  public function detachCategories()
  {
    $this->model->categories()->detach();
  }

  /**
   * List all the product attributes associated with the product
   *
   * @return Collection
   */
  public function listProductAttributes(): Collection
  {
    return $this->model->attributes()->get();
  }

  /**
   * @return mixed
   */
  public function findProductImages(): Collection
  {
    return $this->model->images()->get();
  }

  /**
   * @param Collection $collection
   *
   * @return void
   */
  public function saveProductImages(Collection $collection)
  {
    $collection->each(function (UploadedFile $file) {
      $filename = $this->uploadOne($file, 'products/' . $this->model->id);
      $productImage = new ProductImage([
        'product_id' => $this->model->id,
        'src' => $filename
      ]);
      $this->model->images()->save($productImage);
    });
  }

  /**
   * Delete the attribute from the product
   *
   * @param ProductAttribute $productAttribute
   *
   * @return bool|null
   * @throws \Exception
   */
  public function removeProductAttribute(ProductAttribute $productAttribute): ?bool
  {
    return $productAttribute->delete();
  }

  /**
   * @param ProductAttribute $productAttribute
   * @param AttributeValue ...$attributeValues
   *
   * @return Collection
   */
  public function saveCombination(ProductAttribute $productAttribute, AttributeValue ...$attributeValues): Collection
  {
    return collect($attributeValues)->each(function (AttributeValue $value) use ($productAttribute) {
      return $productAttribute->attributesValues()->save($value);
    });
  }

  /**
   * @return Collection
   */
  public function listCombinations(): Collection
  {
    return $this->model->attributes()->map(function (ProductAttribute $productAttribute) {
      return $productAttribute->attributesValues;
    });
  }

  /**
   * @param ProductAttribute $productAttribute
   * @return \Illuminate\Database\Eloquent\Collection
   */
  public function findProductCombination(ProductAttribute $productAttribute)
  {
    $values = $productAttribute->attributesValues()->get();

    return $values->map(function (AttributeValue $attributeValue) {
      return $attributeValue;
    })->keyBy(function (AttributeValue $item) {
      return strtolower($item->attribute->name);
    })->transform(function (AttributeValue $value) {
      return $value->value;
    });
  }

  /**
   * Associate the product attribute to the product
   *
   * @param ProductAttribute $productAttribute
   * @return ProductAttribute
   */
  public function saveProductAttributes(ProductAttribute $productAttribute): ProductAttribute
  {
    $this->model->attributes()->save($productAttribute);
    return $productAttribute;
  }
}
