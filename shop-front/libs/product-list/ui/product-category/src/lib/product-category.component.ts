import { Product } from '@shop/shared/data-access/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shop-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  products!: Product[];
  constructor() {}

  ngOnInit(): void {
    this.products = [
      {
        id: 2,
        sku: '1039318',
        name: 'Hic laudantium est impedit a.',
        slug: 'hic-laudantium-est-impedit-a',
        description:
          'Voluptas voluptates et quidem est numquam molestiae dolor. Aut sit ut aut quas. Maiores sapiente ad recusandae provident nobis.',
        thumb: 'php7B9A.tmp.png',
        quantity: 9,
        price: 10.0,
        sale_price: null,
        sale_percentage: null,
        status: 1,
        length: null,
        width: null,
        height: null,
        weight: 5.0,
        massUnit: 'gms',
        createdAt: '2023-02-02T15:35:28.000000Z',
        updatedAt: '2023-02-02T15:35:28.000000Z',
        pivot: {
          category_id: 2,
          product_id: 2,
        },
      },
      {
        id: 3,
        sku: '1019906',
        name: 'Atque sequi voluptates ex.',
        slug: 'atque-sequi-voluptates-ex',
        description:
          'Impedit reiciendis aut est unde quia. Sequi a quasi ut. Quis facere beatae illum et sequi aut cum. Eos quasi laborum non velit expedita voluptas est.',
        thumb: 'php7BAB.tmp.png',
        quantity: 5,
        price: 10.0,
        sale_price: null,
        sale_percentage: null,
        status: 1,
        length: null,
        width: null,
        height: null,
        weight: 5.0,
        distance_unit: null,
        massUnit: 'gms',
        createdAt: '2023-02-02T15:35:28.000000Z',
        updatedAt: '2023-02-02T15:35:28.000000Z',
        pivot: {
          category_id: 2,
          product_id: 3,
        },
      },
      {
        id: 4,
        sku: '1060837',
        name: 'Assumenda eos ut eaque suscipit corporis.',
        slug: 'assumenda-eos-ut-eaque-suscipit-corporis',
        description:
          'Rerum non odit vel occaecati consequuntur et expedita. Omnis eos repellat aut sunt. Ipsam non quo explicabo sunt et.',
        thumb: 'php7BBB.tmp.png',
        quantity: 5,
        price: 10.0,
        sale_price: null,
        sale_percentage: null,
        status: 1,
        length: null,
        width: null,
        height: null,
        weight: 5,
        distance_unit: null,
        massUnit: 'gms',
        createdAt: '2023-02-02T15:35:28.000000Z',
        updatedAt: '2023-02-02T15:35:28.000000Z',
        pivot: {
          category_id: 2,
          product_id: 4,
        },
      },
      {
        id: 5,
        sku: '1066776',
        name: 'Fuga qui sit consequatur quia possimus explicabo.',
        slug: 'fuga-qui-sit-consequatur-quia-possimus-explicabo',
        description:
          'Aut voluptatibus ut aut voluptas et dolor. Quasi esse voluptatem voluptas et non. Harum delectus et quia ex eum sit. Esse cum exercitationem aut magni optio ea consequatur.',
        thumb: 'php7BCC.tmp.png',
        quantity: 6,
        price: 10.0,
        sale_price: null,
        sale_percentage: null,
        status: 1,
        length: null,
        width: null,
        height: null,
        weight: 5.0,
        distance_unit: null,
        massUnit: 'gms',
        createdAt: '2023-02-02T15:35:28.000000Z',
        updatedAt: '2023-02-02T15:35:28.000000Z',
        pivot: {
          category_id: 2,
          product_id: 5,
        },
      },
    ];
  }

  paginate(event: any) {
    // this.page = event.page + 1;
    // this.perPage = event.rows;
    // this.getProducts();
  }
}
