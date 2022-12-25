<?php

namespace App\Shop\Attributes\Repositories;

use App\Shop\Attributes\Attribute;
use App\Shop\AttributeValues\AttributeValue;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepositoryInterface;

interface AttributeRepositoryInterface extends BaseRepositoryInterface
{
  public function createAttribute(array $data): Attribute;

  public function findAttributeById(int $id): Attribute;

  public function updateAttribute(array $data): Attribute;

  public function deleteAttribute(): ?bool;

  public function listAttributes($columns = array('*'), string $orderBy = 'id', string $sortBy = 'asc'): Collection;

  public function listAttributeValues(): Collection;

  public function associateAttributeValue(AttributeValue $attributeValue): AttributeValue;
}
