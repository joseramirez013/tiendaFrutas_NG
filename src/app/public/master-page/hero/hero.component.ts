import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  //router: string;
  isLogged: Boolean = false; // Que no este loggueado
  subscription: Subscription;
  currentUrl: string = '';

  constructor(private _router: Router, private secService: SecurityService) {
    //this.router = this._router.url;
    this.subscription = this.secService.getUserData().subscribe(data => {
      this.isLogged = data.isLogged; //Me suscribo al inicio de sesion para ver si lo muestro o no
   });
  }

  ngOnInit(): void {
  }
}
