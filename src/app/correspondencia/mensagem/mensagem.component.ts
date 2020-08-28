import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, empty } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';

import { MensagemQuantidade } from '../service/model/mensagemQuantidade';
import { MensagemAfiliado } from '../service/model/mensagemAfiliado';

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
  
  unsub$ = new Subject();

  constructor(
    private msgService: MensagemService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.msgService.listarAfiliados()
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        this.afiliados = retorno;
    });

    this.mensagens = null;
    
    this.router.params
      .pipe(
        map((params:any) => params['id']),
        switchMap(id => {
          if(id) {
            return this.msgService.listarMensagens(id)
          }
          return empty();
        }),
        takeUntil(this.unsub$)
      )
      .subscribe(retorno => {
        this.mensagens = retorno;
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
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
