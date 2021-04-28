import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { ChangePasswordModel } from '../../../models/security/change-password.model';
import MD5 from 'crypto-js/md5';

declare const showMessage: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  fgValidator: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding(){
    this.fgValidator = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPassword2: ['', [Validators.required]]
    });
  }
  /**
  * Method to validate credentials of a user
  */
  ChangePasswordFn(){
    if(this.fgValidator.invalid || this.fgv.newPassword.value != this.fgv.newPassword2.value){ // Verifica si el formulario es invalido
      showMessage("Formulario invalido!"); // Mensaje cuando el formulario inválido
      return false;
    }else{
      //showMessage("Registrando..."); // Mensaje cuando el formulario es válido
      let model = this.getPasswordData(); // Retorna un objeto tipo modelo, que es el que se envia al servicio
      this.service.ChangePassword(model).subscribe(
        data =>{
          //this.service.saveSessionData(data);
          showMessage("Your password has been cangedh sucessfully!");
          this.router.navigate(['/home']);
        },
        error => {
          showMessage("Invalid data.");
        }
      );
    }
  }
  /**
  * Get user data in a model
  */
 getPasswordData(): ChangePasswordModel {
    let model = new ChangePasswordModel(); // Define un model
    model.id = this.service.getUserId();
    model.currentPassword = MD5(this.fgv.currentPassword.value).toString(); // Obtener el valor del campo currentPassword
    model.newPassword = MD5(this.fgv.newPassword.value).toString(); // Obtener el valor del campo password
    model.newPassword2 = MD5(this.fgv.newPassword2.value).toString(); // Obtener el valor del campo password2
    return model;
  }

  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }

}