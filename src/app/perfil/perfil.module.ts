import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxModule } from 'angular-admin-lte';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    BoxModule
  ]
})
export class PerfilModule { }
