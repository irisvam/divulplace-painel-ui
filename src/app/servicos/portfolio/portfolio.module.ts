import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BoxModule, DropdownModule } from 'angular-admin-lte';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { PortfolioComponent } from './portfolio.component';
import { ConsultorComponent } from './consultor/consultor.component';
import { ProdutoComponent } from './produto/produto.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { DivulgadorComponent } from './divulgador/divulgador.component';
import { PessoalInfoComponent } from './pessoal-info/pessoal-info.component';
import { ConsultorCrudComponent } from './consultor-crud/consultor-crud.component';
import { ProdutoCrudComponent } from './produto-crud/produto-crud.component';
import { DivulgadorCrudComponent } from './divulgador-crud/divulgador-crud.component';
import { EmpresaCrudComponent } from './empresa-crud/empresa-crud.component';
import { EmpresaContatoComponent } from './empresa-contato/empresa-contato.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [
    PortfolioComponent, 
    ConsultorComponent, ConsultorCrudComponent, 
    ProdutoComponent, ProdutoCrudComponent, 
    EmpresaComponent, EmpresaCrudComponent, 
    DivulgadorComponent, DivulgadorCrudComponent, 
    PessoalInfoComponent, EmpresaContatoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PortfolioRoutingModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(options),
    BoxModule, DropdownModule,
    SharedModule
  ]
})
export class PortfolioModule { }
