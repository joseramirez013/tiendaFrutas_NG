import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DefaultComponent } from './public/home/default/default.component';
import { NavbarComponent } from './public/master-page/navbar/navbar.component';
import { SideMenuComponent } from './public/master-page/side-menu/side-menu.component';
import { HeroComponent } from './public/master-page/hero/hero.component';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './modules/products/products.module';
//import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    NavbarComponent,
    SideMenuComponent,
    HeroComponent,
    FooterComponent,
    //FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
