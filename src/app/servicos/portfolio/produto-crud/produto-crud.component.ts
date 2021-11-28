import { Component, OnInit, Input, EventEmitter, TemplateRef, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';
import { ServicoProduto } from '../service/model/servico-produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto-crud',
  templateUrl: './produto-crud.component.html',
  styleUrls: ['./produto-crud.component.scss']
})
export class ProdutoCrudComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  @Input() idProduto: number;
  @Input() idUsuario: number;
  @Output() modalProdutoEvent = new EventEmitter<boolean>();
  modalInterno: BsModalRef;

  icModeloPadrao: boolean;
  icImagem: boolean;
  btnModal: String;

  files: File[];
  noImages: String[];
  
  unsub$ = new Subject();
  
  constructor(
    private altService: AlertModalService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private cstProduto: ProdutoService
  ) {
    super();
  }

  ngOnInit() {
    this.icImagem = false;
    this.formulario = this.formBuilder.group({
      id: [null],
      tpoModelo: ["PADRAO"],
      descricao: [null],
      nomeProduto: [null, Validators.required],
      urlProduto: [null]
    });
    this.icModeloPadrao = true;
    this.formulario.get('tpoModelo').valueChanges
      .pipe(
        switchMap(value => {
          if (value === 'PADRAO') {
            this.icModeloPadrao = true;
            this.modal?.setClass("modal-lg");
          } else {
            this.icModeloPadrao = false;
            this.modal?.setClass("modal-md");
          }
          console.log(this.icModeloPadrao);
          return empty();
        })
      ).subscribe();
      
    this.btnModal = 'Adicionar';

    if (0 != this.idProduto) {  
      this.cstProduto.recuperarProduto(this.idProduto)
        .pipe(takeUntil(this.unsub$))
        .subscribe(retorno => {
          this.inicializarFormServico(retorno);
          this.btnModal = 'Atualizar';
        });
    }

    let assetsImage = "assets/img/250x250.png";
    this.noImages = [assetsImage,assetsImage,assetsImage];
  }

  inicializarFormServico(produto: ServicoProduto){
    this.formulario.patchValue({
      id: produto.id,
      tpoModelo: produto.tpoModelo,
      descricao: produto.descricao,
      nomeProduto: produto.nomeProduto,
      urlProduto: produto.urlProduto
    });
  }

  onImageChange(event) {
    
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = [];
    if (event.target.files && event.target.files[0]) {
      this.noImages = [];
      for (let index = 0; index < selectedFiles.length; index++) {
        if(!selectedFiles.item(index).type.startsWith('image')){
          this.altService.showAlertWarning('Arquivo \'' + selectedFiles.item(index).name + '\' não é uma Imagem!');
          break;
        }
        this.files.push(selectedFiles.item(index));

        var reader = new FileReader();

        reader.onload = (event:any) => {
          this.noImages.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[index]);
      }
      this.icImagem = true;
    }
  }

  openModal(tpltChamado: TemplateRef<any>) {
    this.modalInterno = this.modalService.show(
      tpltChamado, 
      Object.assign({}, { ignoreBackdropClick: true })
    );
  }
  
  updateUrlImagens(newItem: string[]) {
    this.noImages = newItem;
  }

  updateFiles(newItem: File[]) {
    this.files = newItem;
    if (0 == this.files.length) {
      this.noImages.push("assets/img/250x250.png");
      this.noImages.push("assets/img/250x250.png");
      this.icImagem = false;
    }
  }

  submit() {
    
    if(null == this.formulario.value['id']){
      this.cadastrar();
    } else {
      this.atualizar();
    }
  }

  cadastrar(){
    this.cstProduto.cadastrarProduto(this.idUsuario, JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.atualizarImagem(retorno.id);
        this.finalizarModal('Produto cadastrado com sucesso!');
      },
      (error: any) => {
        console.log(error);
        this.altService.showAlertWarning('Erro ao cadastrar Produto!');
      });
  }

  atualizar(){
    this.cstProduto.atualizarProduto(this.formulario.value['id'], JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.atualizarImagem(this.formulario.value['id']);
        this.finalizarModal('Produto atualizado com sucesso!');
      },
      (error: any) => {
        console.log(error);
        this.altService.showAlertWarning('Erro ao atualizar Produto!');
      });
  }

  atualizarImagem(id: number) {
    if(this.files){
      this.cstProduto.upload(id,this.files)
        .pipe(takeUntil(this.unsub$))
        .subscribe(result => { console.log('enviado!') }
        ,
        (error: any) => {
          console.log(error);
          this.altService.showAlertWarning('Erro ao atualizar Imagens do Produto!');
        });
    }
  }

  finalizarModal(msg: string){
    this.altService.showAlertSuccess(msg);
    this.modalProdutoEvent.emit(true);
    this.modal.hide();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
