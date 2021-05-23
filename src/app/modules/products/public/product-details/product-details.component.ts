import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  productId: String;
  productDetails: ProductModel;
  images: ProductImageModel[];

  constructor(private route: ActivatedRoute,
    private service: ProductService,
    private secService: SecurityService) {
    this.productId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getDataOfProduct();
  }

  getDataOfProduct() {
    this.service.getRecordById(this.productId).subscribe(
      data => {
        this.productDetails = data;
        this.images = this.productDetails.images;
      },
      err => {

      }
    );
  }
  /**
   * Agregar el producto al carrito de compras
   */
  /*
    AddToShoppingCart(){
      let cartId = this.secService.getCartId(); //Devuelve el id del carrito de compras del usuario que esta en sesion
      //Enviar dentro del producto el cartId y el productId
      this.service.addToShoppingCart(cartId, this.productId).subscribe(
        data=>{
          showMessage("Your product has been sucessfully added to the shopping cart!");
        },
        err=>{
          showMessage("Fault to add your product to the shopping cart");
        }
      );
    }
  }
  */

}
