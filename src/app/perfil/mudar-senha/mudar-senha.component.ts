import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/public_api';

import { FormValidations } from 'src/app/shared/form-validatotions';
import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.component.html',
  styleUrls: ['./mudar-senha.component.scss']
})
export class MudarSenhaComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      senha: [null, Validators.required],
      novaSenha: [null, Validators.required],
      confirmaSenha: [null, [Validators.required, FormValidations.equalsTo('novaSenha')]]
    });
  }

  submit() {
    this.modal.hide();
  }

}
