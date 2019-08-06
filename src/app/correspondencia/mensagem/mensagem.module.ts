import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BoxModule } from 'angular-admin-lte';

import { MensagemRoutingModule } from './mensagem-routing.module';
import { MensagemComponent } from './mensagem.component';

@NgModule({
  declarations: [MensagemComponent],
  imports: [
    CommonModule,
    MensagemRoutingModule,
    BoxModule,
    HttpClientModule
  ]
})
export class MensagemModule { }
