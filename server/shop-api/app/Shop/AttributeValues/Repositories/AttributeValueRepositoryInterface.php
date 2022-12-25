<?php

namespace App\Shop\AttributeValues\Repositories;

use App\Shop\Attributes\Attribute;
use App\Shop\AttributeValues\AttributeValue;
use Illuminate\Support\Collection;
use Jsdecena\Baserepo\BaseRepositoryInterface;

interface AttributeValueRepositoryInterface extends BaseRepositoryInterface
{
  public function createAttributeValue(Attribute $attribute, array $data): AttributeValue;

  public function associateToAttribute(Attribute $attribute): AttributeValue;

  public function dissociateFromAttribute(): bool;

  public function findProductAttributes(): Collection;
}
