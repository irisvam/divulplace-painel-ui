import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  modalProduto: BsModalRef;
  
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(tpltProduto: TemplateRef<any>) {
    this.modalProduto = this.modalService.show(tpltProduto);
  }

}
