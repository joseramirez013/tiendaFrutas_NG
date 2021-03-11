import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from 'src/app/config/forms-config';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security.service';
import MD5 from 'crypto-js/md5';

declare const showMessage: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidator: FormGroup;
  usernameMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding(){
    this.fgValidator = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.usernameMinLength)]],
      password: ['', [Validators.required]]
    });
  }
  /**
  * Method to validate credentials of a user
  */
  LoginCustomerFn(){
    if(this.fgValidator.invalid){ // Verifica si el formulario es invalido
      showMessage("Formulario invalido!"); // Mensaje cuando el formulario inválido
      return false;
    }else{
      //showMessage("Registrando..."); // Mensaje cuando el formulario es válido
      let model = this.getLoginData(); // Retorna un objeto tipo modelo, que es el que se envia al servicio
      console.log(model);
      this.service.CustomerLogin(model).subscribe(
        userInfo =>{
          this.service.saveSessionData(userInfo);
          showMessage("Welcome to your account.");
          this.router.navigate(['/home']);
        },
        error => {
          showMessage("Invalid data. ");
        }
      );
    }
  }
  /**
  * Get user data in a model
  */
  getLoginData(): UserModel {
    let model = new UserModel(); // Define un model
    model.username = this.fgv.username.value; // Obtener el valor del campo username
    model.password = MD5(this.fgv.password.value).toString(); // Obtener el valor del campo password
    return model;
  }
  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }

}
