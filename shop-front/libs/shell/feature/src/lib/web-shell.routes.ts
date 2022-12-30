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
