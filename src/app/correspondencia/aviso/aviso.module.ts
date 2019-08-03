import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxModule } from 'angular-admin-lte';

import { AvisoRoutingModule } from './aviso-routing.module';
import { AvisoComponent } from './aviso.component';

@NgModule({
  declarations: [AvisoComponent],
  imports: [
    CommonModule,
    AvisoRoutingModule,
    BoxModule
  ]
})
export class AvisoModule { }
