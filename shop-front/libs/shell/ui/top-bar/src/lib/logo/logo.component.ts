import { Component } from '@angular/core';

@Component({
  selector: 'shop-logo',
  template: ` <h1 class="text-2xl">{{ 'Houseware Shop' | uppercase }}</h1> `,
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
export class LogoComponent {}
