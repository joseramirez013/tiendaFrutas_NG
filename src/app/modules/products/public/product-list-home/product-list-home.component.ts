import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/products/product.model';
import { SaleItemModel } from 'src/app/models/shoppingCart/sale-item.model';
import { DataService } from 'src/app/services/data.service';
import { ProductService } from 'src/app/services/products/product.service';
import { SecurityService } from 'src/app/services/security.service';
import { SaleItemService } from 'src/app/services/shopping-cart/sale-item.service';

declare const showMessage: any;

@Component({
  selector: 'app-product-list-home',
  templateUrl: './product-list-home.component.html',
  styleUrls: ['./product-list-home.component.css'],
})
export class ProductListHomeComponent implements OnInit {

  productList: ProductModel[];
  cartId: String;
  saleItemList: SaleItemModel;
 
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private secService: SecurityService,
    private saleService: SaleItemService,
    private dataService: DataService) {
      this.cartId = this.secService.getCartId();
     }

     filterProduct = '';

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCartItems();
  }

  /**
   * Calcular el total de productos del carrito de compras
   */
  getAllCartItems(){
    this.saleService.getRecordById(this.cartId).subscribe(
      data =>{
        this.saleItemList = data;
        let totalProducts = 0;
        for (var item in this.saleItemList) {
          totalProducts += (this.saleItemList[item]['amount']);
        }
        this.dataService.totalCartItems = totalProducts;

      },
      err => {
        showMessage("Error loading the total cart items.");
      }
    );
  }

  /**
   * Get all records of products to show into home
   */
  getAllProducts() {
    this.service.getAllRecords().subscribe(
      data => {
        this.productList = data;
        //console.log(this.productList);
      },
      err => {
        showMessage("Error loading the product list.");
      }
    );
  }

  OpenDetails(id) {
    this.router.navigate([`/products/product-details/${id}`]);
  }
}
