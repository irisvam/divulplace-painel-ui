import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-consultor-video',
  templateUrl: './consultor-video.component.html',
  styleUrls: ['./consultor-video.component.scss']
})
export class ConsultorVideoComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  @Input() urlVideo: String;
  @Output() urlVideoEvent = new EventEmitter<String>();
  
  constructor(private formBuilder: FormBuilder) {
    super();
   }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      urlVideo: [this.urlVideo]
    });
  }

  submit() {
    console.log(this.formulario.get('urlVideo').value);
    this.urlVideoEvent.emit(this.formulario.get('urlVideo').value);
    this.modal.hide();
  }

}
