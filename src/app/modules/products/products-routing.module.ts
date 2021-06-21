import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthenticatedGuard } from 'src/app/guards/admin-authenticated.guard';
import { ProductCreationComponent } from './admin/product-creation/product-creation.component';
import { ProductEditionComponent } from './admin/product-edition/product-edition.component';
import { ProductImagesComponent } from './admin/product-images/product-images.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductDetailsComponent } from './public/product-details/product-details.component';
import { ShoppingCartComponent } from './public/shopping-cart/shopping-cart.component';


const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product-creation',
    component: ProductCreationComponent,
    canActivate: [AdminAuthenticatedGuard]
  },
  {
    path: 'product-edition/:id',
    component: ProductEditionComponent,
    canActivate: [AdminAuthenticatedGuard]
  },
  {
    path: 'product-images/:id',
    component: ProductImagesComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
