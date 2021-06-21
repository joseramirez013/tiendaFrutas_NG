import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductImageModel } from 'src/app/models/products/product-image.model';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/products/product.service';
import { SecurityService } from 'src/app/services/security.service';

declare const showMessage: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  amount: number;
  fgValidator: FormGroup;
  productId: String;
  productDetails: ProductModel;
  images: ProductImageModel[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProductService,
    private secService: SecurityService) {
    this.productId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    //this.FormBuilding();
    this.getDataOfProduct();
  }

  getDataOfProduct() {
    this.service.getRecordById(this.productId).subscribe(
      data => {
        this.productDetails = data;
        //console.log(this.productDetails);
        this.images = this.productDetails.images;
      },
      err => {

      }
    );
  }
  /**
   * Agregar el producto al carrito de compras
   */
  AddToShoppingCart() {
    let saleItemData = {
      cartId: this.secService.getCartId(), //Devuelve el id del carrito de compras del usuario que esta en sesion
      productId: this.productDetails["id"],
      amount: this.amount, //Obtener el valor del campo "amount" 
    }
    //Enviar dentro del producto el cartId y el productId
    this.service.AddToShoppingCart(saleItemData).subscribe(
      data => {
        //console.log(saleItemData);
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

  /* FormBuilding() {
    this.fgValidator = this.fb.group({
      amount: [Validators.required]
    });
  } */

  //Devuelve los controles
  get fgv() {
    return this.fgValidator.controls;
  }

}
