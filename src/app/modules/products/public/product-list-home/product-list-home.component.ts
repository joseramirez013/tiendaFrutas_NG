import { Component, OnInit, Input } from '@angular/core';
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
      //this.productList = this.route.snapshot.params["id"];
    //console.log(this.productList);      
     }

     filterProduct = '';

  ngOnInit(): void {
    this.FormBuilding();
    this.getAllProducts();
    //this.getDataOfProduct();
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
  /*
  getDataOfProduct() {
    this.service.getRecordById(this.productId).subscribe(
      data => {
        console.log("subscrito");
        //this.productList = data;
        //this.images = this.productDetails.images;
      },
      err => {

      }
    );
  }
  */

  OpenDetails(id) {
    this.router.navigate([`/products/product-details/${id}`]);
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      amount: ['1', [Validators.required]]
    });
  }

 
  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }

}
