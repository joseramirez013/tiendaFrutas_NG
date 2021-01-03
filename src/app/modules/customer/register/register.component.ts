import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fgValidator: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding(){
    this.fgValidator = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(7)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  CustomerRegisterFn(){
    if(this.fgValidator.invalid){ // Verifica si el formulario es invalido
      alert("Formulario invalido!"); // Mensaje cuando el formulario inválido
      return false;
    }
    alert("Registrando nuevo usuario..."); // Mensaje cuando el formulario es válido
    return false;
  }

  get fgv(){
    return this.fgValidator.controls;
  }



}
