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
    redirectTo: '/home'
  },
  {
    path: 'security',
    loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'parameters',
    loadChildren: () => import('./modules/parameters/parameters.module').then(m => m.ParametersModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
  },
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
