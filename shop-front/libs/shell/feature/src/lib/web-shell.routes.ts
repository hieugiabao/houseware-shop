import { Route } from '@angular/router';
import { LayoutComponent } from '@shop/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@shop/home/feature')).HomeFeatureModule,
      },
      {
        path: 'products',
        loadChildren: async () =>
          (await import('@shop/product-list/feature')).ProductListFeatureModule,
      },
      {
        path: 'cart',
        loadChildren: async () =>
          (await import('@shop/cart/feature')).CartFeatureModule,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@shop/security/feature')).SecurityModule,
      },
    ],
  },
];
