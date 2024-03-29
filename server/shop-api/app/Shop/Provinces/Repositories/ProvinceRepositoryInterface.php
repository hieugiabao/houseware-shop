<?php

namespace App\Shop\Provinces\Repositories;

use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Shop\Provinces\Province;
use Illuminate\Support\Collection;

interface ProvinceRepositoryInterface extends BaseRepositoryInterface
{
  public function listProvinces(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Collection;

  public function findProvinceById(int $id): Province;

  public function updateProvince(array $params): bool;

  public function listCities(int $provinceId);
}
