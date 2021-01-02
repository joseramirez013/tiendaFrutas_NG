import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { CommonModule } from '@angular/common';

import { DefaultComponent } from './public/home/default/default.component';



const routes: Routes = [
  {
    path:'home',
    component: DefaultComponent
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/home' },
  /** This must be the last one */
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  //declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
