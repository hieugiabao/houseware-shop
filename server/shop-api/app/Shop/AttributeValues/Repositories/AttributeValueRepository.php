<?php

namespace App\Shop\AttributeValues\Repositories;

use App\Shop\Attributes\Attribute;
use App\Shop\AttributeValues\AttributeValue;
use App\Shop\AttributeValues\Exceptions\CreateAttributeValueErrorException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepository;

class AttributeValueRepository extends BaseRepository implements AttributeValueRepositoryInterface
{
  /**
   * @var AttributeValue
   *
   */
  protected $model;

  /**
   * AttributeValueRepository constructor.
   *
   * @param AttributeValue $attributeValue
   *
   */
  public function __construct(AttributeValue $attributeValue)
  {
    parent::__construct($attributeValue);
    $this->model = $attributeValue;
  }

  /**
   * @param Attribute $attribute
   * @param array $data
   * @return AttributeValue
   */
  public function createAttributeValue(Attribute $attribute, array $data): AttributeValue
  {
    try {
      $attributeValue = new AttributeValue($data);
      $attributeValue->attribute()->associate($attribute);
      $attributeValue->save();
      return $attributeValue;
    } catch (QueryException $e) {
      throw new CreateAttributeValueErrorException('create attribute value error', 500, $e);
    }
  }

  /**
   * Create the attribute value and associate to the attribute
   *
   * @param Attribute $attribute
   * @return AttributeValue
   */
  public function associateToAttribute(Attribute $attribute): AttributeValue
  {
    $this->model->attribute()->associate($attribute);
    $this->model->save();
    return $this->model;
  }

  /**
   * Remove association from the attribute
   *
   * @return bool
   */
  public function dissociateFromAttribute(): bool
  {
    return $this->model->delete();
  }

  /**
   * @return Collection
   */
  public function findProductAttributes(): Collection
  {
    return $this->model->productAttributes()->get();
  }
}
