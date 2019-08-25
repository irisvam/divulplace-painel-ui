import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BoxModule } from 'angular-admin-lte';

import { SharedModule } from '../shared/shared.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PerfilService } from './service/perfil.service';

@NgModule({
  declarations: [PerfilComponent, DadosPessoaisComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PerfilRoutingModule,
    BoxModule,
    SharedModule
  ]
})
export class PerfilModule { }
