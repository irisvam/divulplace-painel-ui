import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
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

  urlPrefEmb = "https://www.youtube.com/embed/";
  urlPrefPad = "https://www.youtube.com/watch?v=";
  urlPrefRed = "https://youtu.be/";
  
  constructor(
    private altService: AlertModalService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      urlVideo: [this.urlVideo]
    });
  }

  submit() {

    if(this.validarUrlVideo(this.formulario.get('urlVideo').value)) {
      this.urlVideoEvent.emit(this.formulario.get('urlVideo').value);
      this.modal.hide();
    } else {
      this.altService.showAlertDanger('URL de link Youtube não confere! Coloque o link completo!');
    }
  }

  validarUrlVideo(urlVideo: String): boolean {

    let tpoUrlYouTube = false;

    if(urlVideo){
      if(urlVideo.includes(this.urlPrefEmb)){
        tpoUrlYouTube = true;
      } else if(urlVideo.includes(this.urlPrefPad)){
        urlVideo = urlVideo.replace(this.urlPrefPad, this.urlPrefEmb);
        tpoUrlYouTube = true;
      } else if(urlVideo.includes(this.urlPrefRed)){
        urlVideo = urlVideo.replace(this.urlPrefRed, this.urlPrefEmb);
        tpoUrlYouTube = true;
      }

      if(urlVideo.includes("&t=")){
        urlVideo = urlVideo.substring(0,urlVideo.indexOf("&t="));
      }

      if(tpoUrlYouTube){
        this.formulario.get('urlVideo').setValue(urlVideo);
      }
    }
    return tpoUrlYouTube;
  }

}
