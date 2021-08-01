import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/products/product.service';
import { SecurityService } from 'src/app/services/security.service';

declare const showMessage: any;

@Component({
  selector: 'app-product-list-home',
  templateUrl: './product-list-home.component.html',
  styleUrls: ['./product-list-home.component.css'],
})
export class ProductListHomeComponent implements OnInit {

  productList: ProductModel[];
 
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService) { }

     filterProduct = '';

  ngOnInit(): void {
    this.getAllProducts();
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
