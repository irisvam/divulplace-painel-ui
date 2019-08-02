import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlyerRoutingModule } from './flyer-routing.module';
import { FlyerComponent } from './flyer.component';


@NgModule({
  declarations: [FlyerComponent],
  imports: [
    CommonModule,
    FlyerRoutingModule
  ]
})
export class FlyerModule { }
