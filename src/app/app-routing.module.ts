import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Início',
    description: 'Bem vindo!',
    breadcrumbs: 'Inicío'
  }, children: [{
    path: '',
    component: HomeComponent
  }]
  }, {
  path: 'login',
  data: {
    customLayout: true
    }, children: [
    {
      path: 'auth',
      loadChildren: './login/auth/auth.module#AuthModule'
    },
    {
      path: 'register',
      loadChildren: './login/register/register.module#RegisterModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
