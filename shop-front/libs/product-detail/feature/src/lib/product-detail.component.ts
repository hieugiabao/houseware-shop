import { Component, OnInit } from '@angular/core';
import { Product } from '@shop/shared/data-access/models';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shop-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  breadCrumbItems!: MenuItem[];
  home!: MenuItem;
  product: Product = {
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
  };
  images!: any[];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Women' },
      { label: 'Clothing' },
      { label: 'Shirts and tops' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.images = [
      {
        previewImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        thumbnailImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=20&w=40',
      },
      {
        previewImageSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
        thumbnailImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=20&w=40',
      },
      {
        previewImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        thumbnailImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=20&w=40',
      },
      {
        previewImageSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
        thumbnailImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=20&w=40',
      },
      {
        previewImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        thumbnailImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=20&w=40',
      },
      {
        previewImageSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
        thumbnailImageSrc:
          'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=20&w=40',
      },
    ];
  }
}
