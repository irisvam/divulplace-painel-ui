import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/login/_services/authentication.service';
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
  servicos: ServicoConsultor[];

  unsub$ = new Subject();

  constructor(
    private modalService: BsModalService,
    private cstService: ConsultorService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#222d32';

    this.idUsuario = this.authenticationService.currentUserValue.id;
    this.cstService.recuperarServicos(this.idUsuario)
      .subscribe(retorno => {
        console.log(retorno);
         this.servicos = retorno.map((servico)=>{
          console.log(servico);
          return servico})
      },
      (error: any) => {
        console.log(error);
      });
  }

  openModal(tpltServico: TemplateRef<any>, id : number) {

    console.log(id);

    this.idSelecionado = id;

    this.modalServico = this.modalService.show(
      tpltServico,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
