import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { MensagemService } from '../service/mensagem.service';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent implements OnInit, OnDestroy {

  afiliados: MensagemQuantidade[];
  mensagens: MensagemAfiliado[];
  afiliadoId: number;
  inscricaoMensagem: Subscription;

  constructor(
    private msgService: MensagemService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.msgService.listarAfiliados().subscribe(retorno => {
      this.afiliados = retorno;
    });

    this.inscricaoMensagem = this.router.params.subscribe(params => {
      this.afiliadoId = params['id'];
      if(params['id']){
        this.msgService.listarMensagens().subscribe(retorno => {
          this.mensagens = retorno;
          console.log(retorno);
          this.mensagens.forEach(element => {
            if(element.afiliadoId == 0){
              element.afiliado = {
                id: 0 ,
                nome: "Nome Usuário",
                img: "assets/img/user.png"
              }
            } else {
              element.afiliado = {
                id: 1 ,
                nome: "Outro Usuário",
                img: "assets/img/user.png"
              }
            }
          });
        });
      } else {
        this.mensagens = null;
      }
    });
  }

  ngOnDestroy() {
    this.inscricaoMensagem.unsubscribe();
  }
}
