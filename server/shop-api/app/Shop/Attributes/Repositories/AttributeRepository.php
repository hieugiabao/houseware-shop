<?php

namespace App\Shop\Attributes\Repositories;

use App\Shop\Attributes\Attribute;
use App\Shop\Attributes\Exceptions\AttributeNotFoundException;
use App\Shop\Attributes\Exceptions\CreateAttributeErrorException;
use App\Shop\Attributes\Exceptions\UpdateAttributeErrorException;
use App\Shop\AttributeValues\AttributeValue;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepository;

class AttributeRepository extends BaseRepository implements AttributeRepositoryInterface
{
  /**
   * @var Attribute
   *
   */
  protected $model;

  /**
   * AttributeRepository constructor.
   *
   * @param Attribute $attribute
   *
   */
  public function __construct(Attribute $attribute)
  {
    parent::__construct($attribute);
    $this->model = $attribute;
  }

  /**
   * @param array $data
   *
   * @return Attribute
   * @throws CreateAttributeErrorException
   */
  public function createAttribute(array $data): Attribute
  {
    try {
      $attribute = new Attribute($data);
      $attribute->save();

      return $attribute;
    } catch (QueryException $e) {
      throw new CreateAttributeErrorException('create attribute error', 500, $e);
    }
  }

  /**
   * @param int $id
   * @return Attribute
   * @throws AttributeNotFoundException
   */
  public function findAttributeById(int $id): Attribute
  {
    try {
      return $this->findOneOrFail($id);
    } catch (ModelNotFoundException $e) {
      throw new AttributeNotFoundException('attribute not found', 404, $e);
    }
  }

  /**
   * @param array $data
   * @return Attribute
   * @throws UpdateAttributeErrorException
   */
  public function updateAttribute(array $data): Attribute
  {
    try {
      $attribute = $this->findAttributeById($this->model->id);
      $attribute->update($data);

      return $attribute;
    } catch (QueryException $e) {
      throw new UpdateAttributeErrorException('update attribute error', 500, $e);
    }
  }

  /**
   * @return bool|null
   */
  public function deleteAttribute(): ?bool
  {
    return $this->model->delete();
  }

  /**
   * @param array $columns
   * @param string $orderBy
   * @param string $sortBy
   * @return Collection
   */
  public function listAttributes($columns = array('*'), string $orderBy = 'id', string $sortBy = 'asc'): Collection
  {
    return $this->all($columns, $orderBy, $sortBy);
  }

  /**
   * @return Collection
   */
  public function listAttributeValues(): Collection
  {
    return $this->model->values()->get();
  }

  /**
   * @param AttributeValue $attributeValue
   * @return AttributeValue
   */
  public function associateAttributeValue(AttributeValue $attributeValue): AttributeValue
  {
    return $this->model->values()->save($attributeValue);
  }
}
