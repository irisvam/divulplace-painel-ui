import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-image-crud',
  templateUrl: './image-crud.component.html',
  styleUrls: ['./image-crud.component.scss']
})
export class ImageCrudComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  @Input() imagens: File[];
  @Input() urlImagens: String[];
  @Output() urlEvent = new EventEmitter<String[]>();
  @Output() fileEvent = new EventEmitter<File[]>();
  
  newImagens: File[] = [];
  selectedImage = 0;
  newUrlImagens: String[] = [];

  constructor(
    private altService: AlertModalService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null]
    });

    this.imagens.forEach(item => this.newImagens.push(item));

    for (let index = 0; index < this.urlImagens.length; index++) {
      this.newUrlImagens.push(this.urlImagens[index]);
    }
  }
  onImageChange(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    let conferir: boolean = true;
    if (event.target.files && event.target.files[0]) {
      for (let index = 0; index < selectedFiles.length; index++) {
        if(!selectedFiles.item(index).type.startsWith('image')){
          this.altService.showAlertWarning('Arquivo \'' + selectedFiles.item(index).name + '\' não é uma Imagem!');
          conferir = false;
          break;
        }
        
        if(this.newUrlImagens[0] == "assets/img/250x250.png"){
          this.newUrlImagens.splice(0,1);
        }

        this.newImagens.push(selectedFiles.item(index));

        var reader = new FileReader();

        reader.onload = (event:any) => {
          this.newUrlImagens.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[index]);
      }
    }
  }

  submit() {
    
    this.urlEvent.emit(this.newUrlImagens);
    this.fileEvent.emit(this.newImagens);
    this.modal.hide();
  }

  selectImage(index: number){
    this.selectedImage = index;
  }

  removeImage(){
    this.newUrlImagens.splice(this.selectedImage,1);
    this.newImagens.splice(this.selectedImage,1);

    if(this.selectedImage > 0){
      this.selectedImage = this.selectedImage-1;
    } else {
      if(this.newUrlImagens.length == 0){
        this.newUrlImagens.push("assets/img/250x250.png");
        this.newImagens = [];
      }
    }
  }

}
