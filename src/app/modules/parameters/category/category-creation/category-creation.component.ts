import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { CategoryService } from 'src/app/services/parameters/category.service';

declare const showMessage: any;

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css']
})
export class CategoryCreationComponent implements OnInit {

  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;
  
  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding(){
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]]
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
          this.router.navigate(['/parameters/category-list']);
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
  getCustomerData(): CategoryModel {
    let model = new CategoryModel(); // Define un model
    model.code = this.fgv.code.value; // Obtener el valor del campo code
    model.name = this.fgv.name.value; // Obtener el valor del campo name
    return model;
  }
  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }

}
