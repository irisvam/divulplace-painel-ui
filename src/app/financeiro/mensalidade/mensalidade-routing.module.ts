import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensalidadeComponent } from './mensalidade.component';

const routes: Routes = [{
  path: '',
  component: MensalidadeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensalidadeRoutingModule { }
