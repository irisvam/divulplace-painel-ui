import { Component, OnInit, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from 'events';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';
import { ConsultorService } from '../service/consultor.service';
import { RamoAtividade } from '../service/model/ramo-atividade';
import { ServicoConsultor } from '../service/model/servico-consultor';

@Component({
  selector: 'app-consultor-crud',
  templateUrl: './consultor-crud.component.html',
  styleUrls: ['./consultor-crud.component.scss']
})
export class ConsultorCrudComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;
  @Input() idServico: number;
  @Input() idUsuario: number;
  btnModal: String;

  files: Set<File>;
  noImages: String[];
  
  unsub$ = new Subject();
  
  constructor(
    private altService: AlertModalService,
    private formBuilder: FormBuilder,
    private cstService: ConsultorService
  ) {
    super();
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#222d32';

    this.formulario = this.formBuilder.group({
      id: [null],
      nomeEmpresa: [null, Validators.required],
      descricao: [null, Validators.required],
      identificacao: [null],
      ramo: [null, Validators.required],
      urlEmpresa: [null],
      urlVideo: [null],
      ramoAtividades: new FormArray([])
    });

    this.btnModal = 'Adicionar';

    if (0 != this.idServico) {  
      this.cstService.recuperarServico(this.idServico)
        .pipe(takeUntil(this.unsub$))
        .subscribe(retorno => {
          this.inicializarFormServico(retorno);
          this.btnModal = 'Atualizar';
        });
    }

    let assetsImage = "assets/img/250x250.png";
    this.noImages = [assetsImage,assetsImage,assetsImage,assetsImage];
  }

  inicializarFormServico(servico: ServicoConsultor) {
    if (servico) {
      let ramosDeAtividades = "";
      if(servico.ramoAtividades){
        for (let ramo of servico.ramoAtividades) {
          ramosDeAtividades += ramo.nome + " ";
        }
      }
      this.formulario.patchValue({
        id: servico.id,
        nomeEmpresa: servico.nomeEmpresa,
        descricao: servico.descricao,
        identificacao: servico.identificacao,
        ramo: ramosDeAtividades,
        urlEmpresa: servico.urlEmpresa,
        urlVideo: servico.urlVideo
      });

      let lista = this.buildRamosAtividades(servico.ramoAtividades);
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
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Set();
    let conferir: boolean = true;
    if (event.target.files && event.target.files[0]) {
      this.noImages = [];
      for (let index = 0; index < selectedFiles.length; index++) {
        if(!selectedFiles.item(index).type.startsWith('image')){
          this.altService.showAlertWarning('Arquivo \'' + selectedFiles.item(index).name + '\' não é uma Imagem!');
          conferir = false;
          break;
        }
        this.files.add(selectedFiles.item(index));

        var reader = new FileReader();

        reader.onload = (event:any) => {
          this.noImages.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[index]);
      }
    }
    if(conferir){
      this.altService.showAlertSuccess('Arquivo é uma Imagem!');
      //this.cstService.upload(this.idServico,this.files)
      //.subscribe(result => console.log('enviado!'));
    }
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
    this.cstService.cadastrarServico(this.idUsuario, JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.altService.showAlertSuccess('Serviço cadastrado com sucesso!');
        this.modal.hide();
      },
      (error: any) => {
        console.log(error);
        this.altService.showAlertWarning('Erro ao cadastrar Serviço!');
      });
  }

  atualizar(){
    this.cstService.atualizarServico(this.formulario.value['id'], JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.altService.showAlertSuccess('Serviço atualizado com sucesso!');
        this.modal.hide();
      },
      (error: any) => {
        console.log(error);
        this.altService.showAlertWarning('Erro ao atualizar Serviço!');
      });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
