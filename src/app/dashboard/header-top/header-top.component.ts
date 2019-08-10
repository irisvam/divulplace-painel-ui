import { Component, OnInit } from '@angular/core';

import { MensagemService } from 'src/app/correspondencia/service/mensagem.service';
import { RecadoService } from 'src/app/correspondencia/service/recado.service';
import { AvisoService } from 'src/app/correspondencia/service/aviso.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {

  mensagens: Mensagem[];
  qtdeMensagens: number;

  recados: Recado[];
  qtdeRecados: number;

  avisoResumos: AvisoResumo[];
  qtdeAvisos: number;

  constructor(
    private msgService: MensagemService,
    private rcdService: RecadoService,
    private avsService: AvisoService
  ) { }

  ngOnInit() {
    this.msgService.listarRecentes().subscribe(retorno => {
      this.mensagens = retorno;
      this.qtdeMensagens = retorno.length;
    });

    this.rcdService.listarRecentes().subscribe(retorno => { 
      this.recados = retorno;
      this.qtdeRecados = retorno.length;
    });

    this.avsService.listarResumo().subscribe(retorno => { 
      this.avisoResumos = retorno;
      this.qtdeAvisos = 0;
      this.avisoResumos.forEach(element => {
        this.qtdeAvisos = this.qtdeAvisos + element.qtde;
        if(element.tipo == 'AFILIADO_NOVO'){
          element.tpoClass = 'fa-users text-aqua';
        } else if(element.tipo == 'AFILIADO_SAIU'){
          element.tpoClass = 'fa-users text-red';
        } else if(element.tipo == 'AFILIADO_PAGO'){
          element.tpoClass = 'fa-shopping-cart text-green';
        } else if(element.tipo == 'ERRO_PAGMTO'){
          element.tpoClass = 'fa-warning text-yellow';
        } else if(element.tipo == 'ATUAL_PERFIL'){
          element.tpoClass = 'fa-user text-light-blue';
        }
      });
    });
  }

}
