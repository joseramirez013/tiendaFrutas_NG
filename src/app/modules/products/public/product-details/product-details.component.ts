import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductImageModel } from 'src/app/models/products/product-image.model';
import { ProductModel } from 'src/app/models/products/product.model';
import { SaleItemModel } from 'src/app/models/shoppingCart/sale-item.model';
import { DataService } from 'src/app/services/data.service';
import { ProductService } from 'src/app/services/products/product.service';
import { SecurityService } from 'src/app/services/security.service';
import { SaleItemService } from 'src/app/services/shopping-cart/sale-item.service';

declare const showMessage: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  
  productId: String;
  name: String;
  price: number;
  amount: number = 1;
  fgValidator: FormGroup;
  productDetails: ProductModel;
  images: ProductImageModel[];
  cartId: String;
  saleItemList: SaleItemModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProductService,
    private salService: SaleItemService,
    private secService: SecurityService,
    private dataService: DataService) {
    this.productId = this.route.snapshot.params["id"];
    this.cartId = this.secService.getCartId();
  }

  ngOnInit(): void {
    //this.FormBuilding();
    this.getDataOfProduct();
    this.getAllCartItems();
  }

  getDataOfProduct() {
    this.service.getRecordById(this.productId).subscribe(
      data => {
        this.productDetails = data;
        this.images = this.productDetails.images;
        // console.log("Product Details");
        // console.log(this.productDetails); 
      },
      err => {

      }
    );
  }

  getAllCartItems(){
    this.salService.getRecordById(this.cartId).subscribe(
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
   * Agregar el producto al carrito de compras
   */
  AddToShoppingCart() {
    let saleItemData = {
      name: this.productDetails.name,
      price: this.productDetails["price"],
      amount: this.amount, //Obtener el valor del campo "amount"
      productId: this.productDetails["id"],
      cartId: this.secService.getCartId(), //Devuelve el id del carrito de compras del usuario que esta en sesion
    }
   
    //Enviar dentro del producto el cartId y el productId
    this.service.AddToShoppingCart(saleItemData).subscribe(
      data => {
        // console.log("Se enviaron los datos:");
        // console.log(saleItemData);
        this.getAllCartItems();
        showMessage("Your product has been sucessfully added to the shopping cart!");
      },
      err => {
        showMessage("Fault to add your product to the shopping cart");
      }
    );
  }
  
/***
 * Regresar atrás
 */
  backToHome() {
    this.router.navigate([`/home/`]);
  }

  //Devuelve los controles
  get fgv() {
    return this.fgValidator.controls;
  }

}
