import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  modalEmpresa: BsModalRef;
  
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(tpltEmpresa: TemplateRef<any>) {
    this.modalEmpresa = this.modalService.show(
      tpltEmpresa,
      Object.assign({}, { ignoreBackdropClick: true, class: 'gray modal-lg' })
    );
  }

}
