import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-empresa-crud',
  templateUrl: './empresa-crud.component.html',
  styleUrls: ['./empresa-crud.component.scss']
})
export class EmpresaCrudComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  modalEndereco: BsModalRef;
  
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nomeEmpresa: [null, Validators.required],
      cnpj: [null, Validators.required],
      descricao: [null, Validators.required],
      ramo: [null, Validators.required],
      urlEmpresa: [null],
      urlVideo: [null]
    });
  }

  openModal(tpltEndereco: TemplateRef<any>) {
    this.modalEndereco = this.modalService.show(
      tpltEndereco, 
      Object.assign({}, { ignoreBackdropClick: true })
    );
  }

  submit() {
    this.modal.hide();
  }

}
