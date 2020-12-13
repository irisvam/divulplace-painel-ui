import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxModule, BoxInfoModule, BoxSmallModule } from 'angular-admin-lte';

import { PromoterRoutingModule } from './promoter-routing.module';
import { PromoterComponent } from './promoter.component';

@NgModule({
  declarations: [PromoterComponent],
  imports: [
    CommonModule,
    PromoterRoutingModule,
    BoxModule, BoxInfoModule, BoxSmallModule
  ]
})
export class PromoterModule { }
