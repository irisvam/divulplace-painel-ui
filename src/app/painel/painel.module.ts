import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxModule, BoxSmallModule } from 'angular-admin-lte';

import { PainelRoutingModule } from './painel-routing.module';
import { PainelComponent } from './painel.component';

@NgModule({
  declarations: [PainelComponent],
  imports: [
    CommonModule,
    PainelRoutingModule,
    BoxModule, BoxSmallModule
  ]
})
export class PainelModule { }
