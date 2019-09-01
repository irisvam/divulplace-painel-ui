import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-produto-crud',
  templateUrl: './produto-crud.component.html',
  styleUrls: ['./produto-crud.component.scss']
})
export class ProdutoCrudComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nomeProduto: [null, Validators.required],
      urlProduto: [null]
    });
  }

  submit() {
    this.modal.hide();
  }

}
