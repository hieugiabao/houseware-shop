import { Component } from '@angular/core';

@Component({
  selector: 'shop-logo',
  template: `
    <a routerLink="/"
      ><h1 class="text-2xl no-underline cursor-pointer">
        {{ 'Houseware Shop' | uppercase }}
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
