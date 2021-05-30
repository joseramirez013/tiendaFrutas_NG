import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  isLogged: Boolean = false; // Que no este loggueado
  subscription: Subscription;

  constructor(private secService: SecurityService) {
    this.subscription = this.secService.getUserData().subscribe(data => {
      this.isLogged = data.isLogged; //Me suscribo al inicio de sesion para ver si lo muestro o no
   });
   }

  ngOnInit(): void {
  }

}
