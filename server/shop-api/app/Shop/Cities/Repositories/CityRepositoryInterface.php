<?php

namespace App\Shop\Cities\Repositories;

use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Shop\Cities\City;

interface CityRepositoryInterface extends BaseRepositoryInterface
{
  public function listCities($columns = ['*'], string $orderBy = 'name', string $sortBy = 'asc');

  public function findCityById(int $id): City;

  public function updateCity(array $params): bool;

  public function findCityByName(string $name): City;
}
