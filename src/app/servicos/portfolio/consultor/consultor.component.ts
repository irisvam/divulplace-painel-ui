import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/login/_services/authentication.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { ConsultorService } from '../service/consultor.service';
import { ServicoConsultor } from '../service/model/servico-consultor';

@Component({
  selector: 'app-consultor',
  templateUrl: './consultor.component.html',
  styleUrls: ['./consultor.component.scss']
})
export class ConsultorComponent implements OnInit {

  modalServico: BsModalRef;
  idUsuario: number;
  idSelecionado = 0;
  servicos$: Observable<ServicoConsultor[]>;

  constructor(
    private mdlService: BsModalService,
    private altService: AlertModalService,
    private cstService: ConsultorService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#222d32';

    this.idUsuario = this.authenticationService.currentUserValue.id;
    this.onRefresh();
  }

  onRefresh() {
    this.servicos$ = this.cstService.recuperarServicos(this.idUsuario)
    .pipe(
      catchError(error => {
        console.log(error);
        this.altService.showAlertDanger('Erro ao carregar serviços!');
        return EMPTY;
      })
    );
  }

  openModal(tpltServico: TemplateRef<any>, id : number) {
    this.idSelecionado = id;
    this.modalServico = this.mdlService.show(
      tpltServico,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  onDelete(id : number) {
    const result$ = this.altService.showConfirm('Confirmar','Deseja deletar o Serviço?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.cstService.deletarServico(id) : EMPTY)
      ).subscribe(
        success => {
          this.onRefresh();
          this.altService.showAlertSuccess('Serviço deletado com sucesso!');
        },
        error => {
          this.altService.showAlertWarning('Erro ao tentar deletar Serviço!');
        }
      );
  }

  ngOnDestroy() {

  }
  
}
