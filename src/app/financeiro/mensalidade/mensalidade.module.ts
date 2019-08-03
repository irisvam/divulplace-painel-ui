import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxModule } from 'angular-admin-lte';

import { MensalidadeRoutingModule } from './mensalidade-routing.module';
import { MensalidadeComponent } from './mensalidade.component';

@NgModule({
  declarations: [MensalidadeComponent],
  imports: [
    CommonModule,
    MensalidadeRoutingModule,
    BoxModule
  ]
})
export class MensalidadeModule { }
