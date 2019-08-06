import { Component, OnInit } from '@angular/core';

import { MensagemService } from 'src/app/correspondencia/service/mensagem.service';
import { RecadoService } from 'src/app/correspondencia/service/recado.service';

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

  constructor(
    private msgService: MensagemService,
    private rcdService: RecadoService
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
  }

}
