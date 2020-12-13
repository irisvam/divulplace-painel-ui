import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-divulgador-crud',
  templateUrl: './divulgador-crud.component.html',
  styleUrls: ['./divulgador-crud.component.scss']
})
export class DivulgadorCrudComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nomeItem: [null, Validators.required],
      descricao: [null, Validators.required],
      urlItem: [null],
    });
  }

  submit() {
    this.modal.hide();
  }

}
