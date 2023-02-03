<?php

namespace App\Shop\Addresses\Transformations;

use App\Shop\Addresses\Address;
use App\Shop\Customers\Customer;
use App\Shop\Customers\Repositories\CustomerRepository;
use App\Shop\Provinces\Province;
use App\Shop\Provinces\Repositories\ProvinceRepository;

trait AddressTransformable
{
    /**
     * Transform the address
     *
     * @param Address $address
     *
     * @return Address
     * @throws \App\Shop\Cities\Exceptions\CityNotFoundException
     * @throws \App\Shop\Countries\Exceptions\CountryNotFoundException
     * @throws \App\Shop\Customers\Exceptions\CustomerNotFoundException
     */
    public function transformAddress(Address $address)
    {
        $obj = new Address;
        $obj->id = $address->id;
        $obj->alias = $address->alias;
        $obj->address_1 = $address->address_1;
        $obj->address_2 = $address->address_2;
        $obj->zip = $address->zip;
        $obj->city = $address->city;

        if (isset($address->province_id)) {
            $provinceRepo = new ProvinceRepository(new Province);
            $province = $provinceRepo->findProvinceById($address->province_id);
            $obj->province = $province->name;
        }

        $customerRepo = new CustomerRepository(new Customer);
        $customer = $customerRepo->findCustomerById($address->customer_id);
        $obj->customer = $customer->name;
        $obj->status = $address->status;

        return $obj;
    }
}
