import { Component, OnInit } from '@angular/core';
import { SaleItemModel } from 'src/app/models/shoppingCart/sale-item.model';
import { ProductService } from 'src/app/services/products/product.service';
import { SecurityService } from 'src/app/services/security.service';
import { SaleItemService } from 'src/app/services/shopping-cart/sale-item.service';

declare const showMessage: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  saleItemList: SaleItemModel;
  cartId: String;

  constructor(
    private service: SaleItemService,
    private prodService: ProductService,
    private secService: SecurityService) {
    this.cartId = this.secService.getCartId();
   }

  ngOnInit(): void {
    //this.getAllItems();
  }

  getAllItems(){
    this.service.getRecordById(this.cartId).subscribe(
      data =>{
        this.saleItemList = data;
      },
      err =>{
        showMessage("Error loading the product list.");
      }
    )
  };

}
