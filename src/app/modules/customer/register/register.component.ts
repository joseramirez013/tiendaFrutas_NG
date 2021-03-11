import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { CustomerService } from '../../../services/customer.service';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerModule } from '../customer.module';
import { Router } from '@angular/router';

declare const showMessage: any; // Declarar showMessage para que esta pueda ser reconocida como una función

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fgValidator: FormGroup;
  documentMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;
  nameMinLength = FormsConfig.NAME_MIN_LENGTH;
  phoneMinLength = FormsConfig.PHONE_MIN_LENGTH;
  phoneMaxLength = FormsConfig.PHONE_MAX_LENGTH;
  addressMinLength = FormsConfig.ADDRESS_MIN_LENGTH;
  cityMinLength = FormsConfig.CITY_MIN_LENGTH;




  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding(){
    this.fgValidator = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(this.documentMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      phone: ['', [Validators.required, Validators.minLength(this.phoneMinLength), Validators.maxLength(this.phoneMaxLength)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(this.addressMinLength)]],
      city: ['', [Validators.required, Validators.minLength(this.cityMinLength)]]
    });
  }
  /**
  * Method to validate credentials of a customer
  */
  CustomerRegisterFn(){
    if(this.fgValidator.invalid){ // Verifica si el formulario es invalido
      showMessage("Formulario invalido!"); // Mensaje cuando el formulario inválido
      return false;
    }else{
      //showMessage("Registrando..."); // Mensaje cuando el formulario es válido
      let model = this.getCustomerData(); // Retorna un objeto tipo modelo, que es el que se envia al servicio
      this.service.CustomerRegistering(model).subscribe(
        data =>{
          showMessage("Registro exitoso, hemos enviado su password a su correo electronico");
          this.router.navigate(['/security/login']);
        },
        error => {
          showMessage("Error al registrarse ");
        }
      );
    }
  }
  /**
  * Get user data in a model
  */
  getCustomerData(): CustomerModel {
    let model = new CustomerModel(); // Define un model
    model.address = this.fgv.address.value; // Obtener el valor del campo address
    model.city = this.fgv.city.value; // Obtener el valor del campo city
    model.document = this.fgv.document.value; // Obtener el valor del campo document
    model.email = this.fgv.email.value; // Obtener el valor del campo email
    model.name = this.fgv.name.value; // Obtener el valor del campo name
    model.lastname = this.fgv.lastname.value; // Obtener el valor del campo lastname
    model.telephone = this.fgv.phone.value; // Obtener el valor del campo phone
    return model;
  }
  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }



}
