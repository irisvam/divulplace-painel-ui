import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-consultor',
  templateUrl: './consultor.component.html',
  styleUrls: ['./consultor.component.scss']
})
export class ConsultorComponent implements OnInit {

  modalServico: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(tpltServico: TemplateRef<any>) {
    this.modalServico = this.modalService.show(
      tpltServico,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
