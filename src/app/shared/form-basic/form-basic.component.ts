import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-form-basic',
  template: '<div></div>'
})
export abstract class FormBasicComponent implements OnInit {

  formulario: FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificarValidacoes(this.formulario);
    }
  }

  verificarValidacoes(formFroup: FormGroup | FormArray) {
    Object.keys(formFroup.controls).forEach(element => {
      const control = formFroup.get(element);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verificarValidacoes(control);
      }
      control.markAsDirty();
    });
  }

  verificarTouched(campo: string) {
    return this.formulario.get(campo).touched || this.formulario.get(campo).dirty;
  }

  verificarValidTouched(campo: string) {
    return this.formulario.get(campo).valid && this.verificarTouched(campo);
  }

  verificarInvalidTouched(campo: string) {
    return !this.formulario.get(campo).valid && this.verificarTouched(campo);
  }

  verificarErroCss(campo: string) {
    return {
      'has-error': this.verificarInvalidTouched(campo),
      'has-success': this.verificarValidTouched(campo),
      'has-feedback': this.verificarTouched(campo)
    }
  }

}
