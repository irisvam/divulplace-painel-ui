import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-diversos',
  templateUrl: './diversos.component.html',
  styleUrls: ['./diversos.component.scss']
})
export class DiversosComponent implements OnInit {

  modalDiverso: BsModalRef;
  
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(tpltDiverso: TemplateRef<any>) {
    this.modalDiverso = this.modalService.show(
      tpltDiverso,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

}
