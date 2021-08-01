import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  totalCartItems: number = 0;

  constructor() { }
}
