import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlyerComponent } from './flyer.component';

const routes: Routes = [{
  path: '',
  component: FlyerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlyerRoutingModule { }
