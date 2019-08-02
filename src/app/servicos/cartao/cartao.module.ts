import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartaoRoutingModule } from './cartao-routing.module';
import { CartaoComponent } from './cartao.component';


@NgModule({
  declarations: [CartaoComponent],
  imports: [
    CommonModule,
    CartaoRoutingModule
  ]
})
export class CartaoModule { }
