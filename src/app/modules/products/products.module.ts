import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductCreationComponent } from './admin/product-creation/product-creation.component';
import { ProductEditionComponent } from './admin/product-edition/product-edition.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductListHomeComponent } from './public/product-list-home/product-list-home.component';
import { ProductDetailsComponent } from './public/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductImagesComponent } from './admin/product-images/product-images.component';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ShoppingCartComponent } from './public/shopping-cart/shopping-cart.component';
import { CartComponent } from './public/shopping-cart/cart/cart.component';


@NgModule({
  declarations: [
    ProductCreationComponent, 
    ProductEditionComponent, 
    ProductListComponent, 
    ProductListHomeComponent, 
    ProductDetailsComponent, 
    ProductImagesComponent,
    FilterPipe,
    ShoppingCartComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports:[
    ProductListHomeComponent,
  ]
})
export class ProductsModule { }
