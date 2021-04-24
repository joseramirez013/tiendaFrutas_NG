import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { BrandService } from 'src/app/services/parameters/brand.service';

declare const showMessage: any;

@Component({
  selector: 'app-brand-edition',
  templateUrl: './brand-edition.component.html',
  styleUrls: ['./brand-edition.component.css']
})
export class BrandEditionComponent implements OnInit {

  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;
  id: String;

  constructor(
    private fb: FormBuilder,
    private service: BrandService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.id = this.route.snapshot.params["id"];
      //console.log("Id de get: " + this.id);
    }

  ngOnInit(): void {
    this.FormBuilding();
    this.getDataOfRecord();
  }

  FormBuilding(){
    this.fgValidator = this.fb.group({
      id: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]]
    });
  }
 
  getDataOfRecord(){
    if(this.id){
      this.service.getRecordById(this.id).subscribe(
        data =>{
          this.fgv.id.setValue(data.id);
          this.fgv.code.setValue(data.code);
          this.fgv.name.setValue(data.name);
        },
        error =>{
          showMessage("Record not found!"); // Mensaje cuando el formulario inválido
          this.router.navigate(['/parameters/brand-list']);
        }
      );
    }else{
      this.router.navigate(["/parameteres/brand-list"]);
    }
  }

 EditRecordFn(){
    if(this.fgValidator.invalid){ // Verifica si el formulario es invalido
      showMessage("Formulario invalido!"); // Mensaje cuando el formulario inválido
      //return false;
    }else{
      //showMessage("Registrando..."); // Mensaje cuando el formulario es válido
      let model = this.getCustomerData(); // Retorna un objeto tipo modelo, que es el que se envia al servicio
      this.service.EditRecord(model).subscribe(
        data =>{
          showMessage("Record updated successfuly");
          this.router.navigate(['/parameters/brand-list']);
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
  getCustomerData(): BrandModel {
    let model = new BrandModel(); // Define un model
    model.id = this.fgv.id.value; // Obtener el valor del campo ID
    model.code = this.fgv.code.value; // Obtener el valor del campo code
    model.name = this.fgv.name.value; // Obtener el valor del campo name
    return model;
  }
  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }

}
