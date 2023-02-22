import { Component } from '@angular/core';

@Component({
  selector: 'shop-logo',
  template: `
    <a routerLink="/" class="flex gap-1">
      <img src="/assets/images/logo.png" alt="logo" />
      <h1 class="text-lg no-underline flex flex-col gap-0 leading-none">
        <span>Shop</span>
        <span>Houseware</span>
      </h1></a
    >
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class ShopLogoComponent {}
