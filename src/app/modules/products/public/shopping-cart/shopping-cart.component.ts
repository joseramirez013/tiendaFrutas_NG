import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/products/product.service';
import { SecurityService } from 'src/app/services/security.service';
import { SaleItemService } from 'src/app/services/shopping-cart/sale-item.service';
import { SaleItemModel } from '../../../../models/shoppingCart/sale-item.model';
import { DataService } from 'src/app/services/data.service';
import { ProductImageModel } from 'src/app/models/products/product-image.model';
import { ProductModel } from 'src/app/models/products/product.model';


declare const showMessage: any;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{

  totalItems: number;
  saleItemList: SaleItemModel;
  cartId: String;
  images: ProductImageModel[];
  productId: string;
  cartTotal: number;
  itemList: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SaleItemService,
    private prodService: ProductService,
    private secService: SecurityService,
    private dataService: DataService) {
    this.cartId = this.secService.getCartId();
  }

  ngOnInit(): void {
    this.getAllData();
  }

  /**
   * Get all records of products to show into home
   * Calcular el total de productos en el carrito de compras
   * Calcular el monto total a pagar
   */
  getAllData() {
    this.service.getRecordById(this.cartId).subscribe(
      data => {
        this.saleItemList = data;
        let totalProducts = 0;
        let totalPrice = 0; //Inicializar variable Resultado y calcular el total del carrito de compras
        for (var item in this.saleItemList) {
          totalProducts += (this.saleItemList[item]['amount']);
          totalPrice += ((this.saleItemList[item]['amount']) * (this.saleItemList[item]['price']));
          // console.log("Product Id");
          // console.log(this.productId);
        }
        this.cartTotal = totalPrice;
        this.totalItems = totalProducts;
        this.dataService.totalCartItems = this.totalItems;
      },
      err => {
        showMessage("Error loading the product list.");
      }
    );
  }

  
  /**
   * Pagar carrito de compras e inmediatamente regresar a home
   */
  toPay(){
    this.service.DeleteSaleItem(this.cartId).subscribe(
      data => {
        this.router.navigate([`/home/`]); //Si 
      },
      err =>{
        showMessage("Fault to delete shopping cart");

      }
    );
  }

  /***
 * Volver atrás
 */
  backToHome() {
    this.router.navigate([`/home/`]);
  }
  
  
}
