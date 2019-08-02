import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxModule, DropdownModule } from 'angular-admin-lte';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';


@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    BoxModule, DropdownModule
  ]
})
export class PortfolioModule { }
