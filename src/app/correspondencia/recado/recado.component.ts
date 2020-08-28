import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, empty } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';

import { RecadoRecebido } from '../service/model/recadoRecebido';
import { RecadoCliente } from '../service/model/recadoCliente';

import { RecadoService } from '../service/recado.service';

@Component({
  selector: 'app-recado',
  templateUrl: './recado.component.html',
  styleUrls: ['./recado.component.scss']
})
export class RecadoComponent implements OnInit, OnDestroy {

  clientes: RecadoRecebido[] = [];
  recado: RecadoCliente;
  indexCliente = -1;

  unsub$ = new Subject();

  constructor(
    private rcdService: RecadoService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rcdService.listarRecados()
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        this.clientes = retorno;
    });

    this.router.params
      .pipe(
        map((params:any) => params['id']),
        switchMap(id => {
          if(id) {
            return this.rcdService.receberRecado(id)
          }
          return empty();
        }),
        takeUntil(this.unsub$)
      )
      .subscribe(retorno => {
        this.recado = retorno;
        for (let index = 0; index < this.clientes.length; index++) {
          if(this.clientes[index].id == this.recado.id){
            this.indexCliente = index;
          }
        }
    });
  }

  onProximo(next: number){
    this.indexCliente = this.indexCliente + next;
    this.rcdService.receberRecado(this.clientes[this.indexCliente].id).subscribe(retorno => {
      this.recado = retorno;
    });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
