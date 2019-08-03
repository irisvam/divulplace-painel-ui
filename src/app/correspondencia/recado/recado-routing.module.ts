import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecadoComponent } from './recado.component';

const routes: Routes = [{
  path: '',
  component: RecadoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecadoRoutingModule { }
