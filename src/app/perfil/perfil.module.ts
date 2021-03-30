import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BoxModule, DropdownModule as mkDropdownModule } from 'angular-admin-lte';

import { PerfilRoutingModule } from './perfil-routing.module';
import { SharedModule } from '../shared/shared.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { PerfilComponent } from './perfil.component';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { MudarSenhaComponent } from './mudar-senha/mudar-senha.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { ContatoComponent } from './contato/contato.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    PerfilComponent, 
    DadosPessoaisComponent, 
    MudarSenhaComponent, 
    EnderecoComponent, 
    ContatoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot(options),
    PerfilRoutingModule,
    BoxModule,
    SharedModule,
    mkDropdownModule
  ]
})
export class PerfilModule { }
