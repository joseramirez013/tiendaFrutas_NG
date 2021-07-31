import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
//import { totalItems } from 'src/app/modules/products/public/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  totalItems: number;
  //totalProducts: number;
  isLogged: Boolean = false;
  role: number = 0;

  subscription: Subscription;

  constructor(
    private service: SecurityService) { }

  ngOnInit(): void {
    this.subscription = this.service.getUserData().subscribe(data => {
      this.isLogged = data.isLogged;
      let total = 0;
      // total = ShoppingCartComponent.totalItems;
      // this.totalProducts = total;
    });
  }
  

}
