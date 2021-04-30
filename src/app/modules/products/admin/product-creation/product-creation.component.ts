import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { ProductModel } from 'src/app/models/products/product.model';
import { BrandService } from 'src/app/services/parameters/brand.service';
import { CategoryService } from 'src/app/services/parameters/category.service';
import { ProductService } from 'src/app/services/products/product.service';

declare const initSelect: any;
declare const showMessage: any;

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;
  categoryList: CategoryModel[];
  brandList: BrandModel[];
  
  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
    this.FormBuilding();
  }

  /**
   * Fill all select in form
   */
  getAllCategories(){
    this.categoryService.getAllRecords().subscribe(
      data => {
        this.categoryList = data;
        setTimeout(initSelect(), 500);
      },
      error => {
        console.error("Error loading categories");
      }
    );
  }

  getAllBrands(){
    this.brandService.getAllRecords().subscribe(
      data => {
        this.brandList = data;
        setTimeout(initSelect(), 500);
      },
      error => {
        console.error("Error loading brands");
      }
    );
  }

  FormBuilding(){
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      brandId: ['', [Validators.required]]
    });
  }
 
 saveNewRecordFn(){
    if(this.fgValidator.invalid){ // Verifica si el formulario es invalido
      showMessage("Formulario invalido!"); // Mensaje cuando el formulario inválido
      //return false;
    }else{
      //showMessage("Registrando..."); // Mensaje cuando el formulario es válido
      let model = this.getCustomerData(); // Retorna un objeto tipo modelo, que es el que se envia al servicio
      this.service.saveNewRecord(model).subscribe(
        data =>{
          showMessage("Record saved successfuly");
          this.router.navigate(['/products/product-list']);
        },
        error => {
          showMessage("Error saving");
        }
      );
    }
  }
  /**
  * Get user data in a model
  */
  getCustomerData(): ProductModel {
    let model = new ProductModel(); // Define un model
    model.code = this.fgv.code.value; // Obtener el valor del campo code
    model.name = this.fgv.name.value; // Obtener el valor del campo name
    model.price = parseInt(this.fgv.price.value); // Obtener el valor del campo name
    model.description = this.fgv.description.value; // Obtener el valor del campo name
    model.stock = parseInt(this.fgv.stock.value); // Obtener el valor del campo name
    model.rate = parseInt(this.fgv.rate.value); // Obtener el valor del campo name
    model.categoryId = this.fgv.categoryId.value; // Obtener el valor del campo name
    model.brandId = this.fgv.brandId.value; // Obtener el valor del campo name
    return model;
  }
  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }

}

