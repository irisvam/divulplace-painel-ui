import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-divulgador',
  templateUrl: './divulgador.component.html',
  styleUrls: ['./divulgador.component.scss']
})
export class DivulgadorComponent implements OnInit {

  modalDivulgador: BsModalRef;
  
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(tpltDivulgador: TemplateRef<any>) {
    this.modalDivulgador = this.modalService.show(
      tpltDivulgador,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

}
