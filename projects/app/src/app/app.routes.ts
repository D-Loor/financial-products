import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('product-manager').then(m => m.productManagerRoutes)
    },
    {
        path: "**",
        redirectTo: "products"
    }
];