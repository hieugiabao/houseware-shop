import {
  Attribute,
  AttributeValue,
  Product,
} from '@shop/shared/data-access/models';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@shop/cart/data-access';

@Component({
  selector: 'shop-product-detail-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() product!: Product;
  attributes: Attribute[] = [];
  loading = false;

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    let attributeValues: AttributeValue[] = [];
    this.product.productAttributes.forEach((productAttribute) => {
      attributeValues = [
        ...attributeValues,
        ...productAttribute.attributesValues,
      ];
    });

    // remove duplicate attribute values
    attributeValues = attributeValues.filter(
      (attributeValue, index, self) =>
        index === self.findIndex((t) => t.id === attributeValue.id)
    );

    attributeValues.forEach((attributeValue) => {
      const attribute = this.attributes.find(
        (att) => att.id === attributeValue.attribute.id
      );
      if (attribute) {
        attribute.values.push(attributeValue);
      } else {
        this.attributes.push({
          id: attributeValue.attribute.id,
          name: attributeValue.attribute.name,
          values: [attributeValue],
        });
      }
    });
  }

  addToCart() {
    this.loading = true;
    this.cartService.addToCart(this.product.id, 1).subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }

  changeAttribute($event: Event, attribute: Attribute) {
    console.log($event);
    console.log(attribute);
  }
}
