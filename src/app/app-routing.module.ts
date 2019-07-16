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
  loadChildren: './login/login.module#LoginModule',
  data: {
    customLayout: true
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
