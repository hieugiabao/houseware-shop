import { Product } from '@shop/shared/data-access/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shop-product-detail-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() product!: Product;
  @Input() sizeOptions!: string[];
  @Input() colorOptions!: string[];
  sizeValue!: string;
  colorValue!: string;
  constructor() {}
  ngOnInit(): void {}
}
