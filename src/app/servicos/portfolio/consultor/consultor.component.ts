import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  deleteModal: BsModalRef;
  @ViewChild('tpltDeleteModal') tpltDeleteModal;
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
        return empty();
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
    this.idSelecionado = id;
    this.deleteModal = this.mdlService.show(
      this.tpltDeleteModal,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  onConfirmeDelete(){
    this.cstService.deletarServico(this.idSelecionado)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModal.hide();
        this.altService.showAlertSuccess('Serviço deletado com sucesso!');
      },
      error => {
        this.deleteModal.hide();
        this.altService.showAlertWarning('Erro ao tentar deletar Serviço!');
      }
    );
  }

  onDeclineDelete(){
    this.deleteModal.hide();
  }

  ngOnDestroy() {

  }
  
}
