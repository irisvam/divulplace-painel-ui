import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisoComponent } from './aviso.component';

const routes: Routes = [
  { path: '', component: AvisoComponent },
  { path: ':id', component: AvisoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisoRoutingModule { }
