import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeUntil, map, switchMap } from 'rxjs/operators';
import { Subject, empty } from 'rxjs';

import { AvisoService } from '../service/aviso.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss']
})
export class AvisoComponent implements OnInit, OnDestroy {

  avisos: AvisoSistema[] = [];
  aviso: AvisoSistema;
  indexAviso = -1;
  
  unsub$ = new Subject();

  constructor(
    private avsService: AvisoService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.avsService.listarAvisos()
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        this.avisos = retorno;
    });

    this.router.params
      .pipe(
        map((params:any) => params['id']),
        switchMap(id => {
          if(id) {
            return this.avsService.receberAviso(id)
          }
          return empty();
        }),
        takeUntil(this.unsub$)
      ).subscribe(retorno => {
        this.aviso = retorno;
        for (let index = 0; index < this.avisos.length; index++) {
          if(this.avisos[index].id == this.aviso.id){
            this.indexAviso = index;
          }
        }
      });
  }

  onProximo(next: number){
    this.indexAviso = this.indexAviso + next;
    this.avsService.receberAviso(this.avisos[this.indexAviso].id).subscribe(retorno => {
      this.aviso = retorno;
    });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
