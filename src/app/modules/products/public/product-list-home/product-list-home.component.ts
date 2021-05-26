import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/products/product.service';
import { SecurityService } from 'src/app/services/security.service';
import { AppModule } from 'src/app/app.module';



declare const showMessage: any;

@Component({
  selector: 'app-product-list-home',
  templateUrl: './product-list-home.component.html',
  styleUrls: ['./product-list-home.component.css'],
})
export class ProductListHomeComponent implements OnInit {
  fgValidator: FormGroup;
  productId: String;
  productList: ProductModel[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private secService: SecurityService) {
      this.productId = this.route.snapshot.params["id"];
     }

     filterProduct = '';

  ngOnInit(): void {
    this.FormBuilding();
    this.getAllProducts();
  }

  getAllProducts() {
    this.service.getAllRecords().subscribe(
      data => {
        this.productList = data;
      },
      err => {

      }
    );
  }
  

  OpenDetails(id) {
    this.router.navigate([`/products/product-details/${id}`]);
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      amount: ['1', [Validators.required]]
    });
  }

  AddToShoppingCart(){
    let saleItemData = {
      productId: this.productId,
      cartId: this.secService.getCartId(),
      amount: parseInt(this.fgv.amount.value) //Obtener el valor del campo "amount"
    }
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

  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }

}
