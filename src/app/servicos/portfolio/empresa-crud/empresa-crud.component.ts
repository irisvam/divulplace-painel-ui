import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';
import { EmpresaService } from '../service/empresa.service';
import { RamoAtividade } from '../service/model/ramo-atividade';
import { ServicoEmpresa } from '../service/model/servico-empresa';

@Component({
  selector: 'app-empresa-crud',
  templateUrl: './empresa-crud.component.html',
  styleUrls: ['./empresa-crud.component.scss']
})
export class EmpresaCrudComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  @Input() idEmpresa: number;
  @Input() idUsuario: number;
  @Output() modalEmpresaEvent = new EventEmitter<boolean>();
  modalInterno: BsModalRef;
  
  idSelecionado = 0;
  btnModal: String;
  icImagem: boolean;
  
  files: File[];
  noImages: String[];
  srcVideo: SafeResourceUrl;

  unsub$ = new Subject();

  constructor(
    private altService: AlertModalService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private empService: EmpresaService,
    public sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {
    this.icImagem = false;

    this.formulario = this.formBuilder.group({
      id: [null],
      nomeEmpresa: [null, Validators.required],
      cnpj: [null, Validators.required],
      descricao: [null, Validators.required],
      ramo: [null, Validators.required],
      urlEmpresa: [null],
      urlVideo: [null],
      ramoAtividades: new FormArray([])
    });

    this.btnModal = 'Adicionar';
    
    if (0 != this.idEmpresa) {  
      this.empService.recuperarEmpresa(this.idEmpresa)
        .pipe(takeUntil(this.unsub$))
        .subscribe(retorno => {
          this.inicializarFormEmpresa(retorno);
          this.btnModal = 'Atualizar';
        });
    }

    let assetsImage = "assets/img/250x250.png";
    this.noImages = [assetsImage,assetsImage,assetsImage];
  }

  inicializarFormEmpresa(empresa: ServicoEmpresa) {
    if (empresa) {
      let ramosDeAtividades = "";
      if(empresa.ramoAtividades){
        for (let ramo of empresa.ramoAtividades) {
          ramosDeAtividades += ramo.nome + " ";
        }
      }
      this.formulario.patchValue({
        id: empresa.id,
        nomeEmpresa: empresa.nomeEmpresa,
        descricao: empresa.descricao,
        ramo: ramosDeAtividades,
        urlEmpresa: empresa.urlEmpresa,
        urlVideo: empresa.urlVideo
      });

      if(this.formulario.get('urlVideo').value){
        this.srcVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.formulario.get('urlVideo').value);
      }

      let lista = this.buildRamosAtividades(empresa.ramoAtividades);
      for (let control of lista.controls) {
        (<FormArray>this.formulario.get('ramoAtividades')).push(control);
      }
    }
  }

  buildRamosAtividades(ramoAtividades :RamoAtividade[]) {

    let values = [];
    
    if(ramoAtividades){
      values = ramoAtividades.map(v => this.formBuilder.group({
        nome: v.nome,
        situacao: false
      }));
    }
  
    return this.formBuilder.array(values);
  }

  verificarRamo(nomeRamo:String){

    let encontrado = false;
    for (let index = 0; index < (<FormArray>this.formulario.get('ramoAtividades')).length; index++) {
      if(nomeRamo == (<FormArray>this.formulario.get('ramoAtividades')).at(index).get("nome").value){
        encontrado = true;
        (<FormArray>this.formulario.get('ramoAtividades')).at(index).patchValue({situacao:true});
        break;
      }
    }
    
    if(!encontrado){
      (<FormArray>this.formulario.get('ramoAtividades')).push(this.formBuilder.group({
        nome: nomeRamo,
        situacao: true
      }));
    }
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

  openModalEndereco(tpltChamado: TemplateRef<any>, id : number) {
    this.idSelecionado = id;
    this.openModal(tpltChamado);
  }

  openModal(tpltChamado: TemplateRef<any>) {
    this.modalInterno = this.modalService.show(
      tpltChamado, 
      Object.assign({}, { ignoreBackdropClick: true })
    );
  }
  
  submit() {

    this.formulario.get('ramo').value.split(' ').forEach(element => {
      if(element){
        this.verificarRamo(element);
      }
    });

    if(null == this.formulario.value['id']){
      this.cadastrar();
    } else {
      this.atualizar();
    }
  }

  cadastrar(){
    this.empService.cadastrarEmpresa(this.idUsuario, JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.atualizarImagem(retorno.id);
        this.finalizarModal('Empresa cadastrada com sucesso!');
      },
      (error: any) => {
        console.log(error);
        this.altService.showAlertWarning('Erro ao cadastrar Empresa!');
      });
  }

  atualizar(){
    this.empService.atualizarEmpresa(this.formulario.value['id'], JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.atualizarImagem(this.formulario.value['id']);
        this.finalizarModal('Empresa atualizada com sucesso!');
      },
      (error: any) => {
        console.log(error);
        this.altService.showAlertWarning('Erro ao atualizar Empresa!');
      });
  }

  atualizarImagem(id: number) {
    if(this.files){
      this.empService.upload(id,this.files)
        .pipe(takeUntil(this.unsub$))
        .subscribe(result => { console.log('enviado!') }
        ,
        (error: any) => {
          console.log(error);
          this.altService.showAlertWarning('Erro ao atualizar Imagens da Empresa!');
        });
    }
  }

  finalizarModal(msg: string){
    this.altService.showAlertSuccess(msg);
    //this.modalConsultorEvent.emit(true);
    this.modal.hide();
  }

  onRefresh() {
    console.log("atualizado");
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  updateUrlVideo(newItem: string) {
    this.formulario.get('urlVideo').setValue(newItem);
    if(newItem){
      this.srcVideo = this.sanitizer.bypassSecurityTrustResourceUrl(newItem);
    }
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

}
