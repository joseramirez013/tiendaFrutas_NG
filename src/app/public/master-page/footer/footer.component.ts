import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLogged: Boolean = false;
  role: number = 0;

  subscription: Subscription;

  constructor(
    private service: SecurityService,
    public dataService: DataService) {
     }

  ngOnInit(): void {
    this.subscription = this.service.getUserData().subscribe(data => {
      this.isLogged = data.isLogged;
    });
  }
}
