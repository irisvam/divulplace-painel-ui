import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-consultor-crud',
  templateUrl: './consultor-crud.component.html',
  styleUrls: ['./consultor-crud.component.scss']
})
export class ConsultorCrudComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nomeEmpresa: [null, Validators.required],
      descricao: [null, Validators.required],
      identificacao: [null],
      ramo: [null, Validators.required],
      urlEmpresa: [null],
      urlVideo: [null]
    });
  }

  submit() {
    this.modal.hide();
  }

}
