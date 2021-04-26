import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { SecurityService } from 'src/app/services/security.service';
import { PasswordResetModel} from '../../../models/security/password-reset.model';

declare const showMessage: any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
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
      type: ['', [Validators.required]]
    });
  }
  /**
  * Method to validate credentials of a user
  */
  PasswordResetFn(){
    if(this.fgValidator.invalid){ // Verifica si el formulario es invalido
      showMessage("Formulario invalido!"); // Mensaje cuando el formulario inválido
      return false;
    }else{
      //showMessage("Registrando..."); // Mensaje cuando el formulario es válido
      let model = this.getPasswordData(); // Retorna un objeto tipo modelo, que es el que se envia al servicio
      this.service.PasswordReset(model).subscribe(
        data =>{
          //this.service.saveSessionData(data);
          showMessage("Your password has been reset sucessfully, please check your email inbox or your cellphone");
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
 getPasswordData(): PasswordResetModel {
    let model = new PasswordResetModel(); // Define un model
    model.username = this.fgv.username.value; // Obtener el valor del campo username
    model.type = parseInt(this.fgv.type.value); // Obtener el valor del campo password
    return model;
  }

  //Devuelve los controles
  get fgv(){
    return this.fgValidator.controls;
  }

}
