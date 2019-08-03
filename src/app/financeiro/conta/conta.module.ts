import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxModule } from 'angular-admin-lte';

import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './conta.component';

@NgModule({
  declarations: [ContaComponent],
  imports: [
    CommonModule,
    ContaRoutingModule,
    BoxModule
  ]
})
export class ContaModule { }
