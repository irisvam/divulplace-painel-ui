import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxModule } from 'angular-admin-lte';

import { RecadoRoutingModule } from './recado-routing.module';
import { RecadoComponent } from './recado.component';

@NgModule({
  declarations: [RecadoComponent],
  imports: [
    CommonModule,
    RecadoRoutingModule,
    BoxModule
  ]
})
export class RecadoModule { }
