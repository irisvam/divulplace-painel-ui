import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PerfilService } from '../service/perfil.service';
import { DropdownService } from 'src/app/shared/service/dropdown.service';
import { AuthenticationService } from 'src/app/login/_services/authentication.service';

import { EstadoCivil } from 'src/app/shared/model/estado-civil';
import { SexoGenero } from 'src/app/shared/model/sexo-genero';
import { UsuarioPerfil } from '../service/model/usuario-perfil';
import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

import * as moment from 'moment';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss'],
  providers: [DatePipe]
})
export class DadosPessoaisComponent extends FormBasicComponent implements OnInit, OnDestroy {

  modalMudaSenha: BsModalRef;
  imgUsuario = "/assets/img/user.png";
  sexoGeneros: Observable<SexoGenero[]>;
  estadosCivis: Observable<EstadoCivil[]>;

  unsub$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private altService: AlertModalService,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private pflService: PerfilService,
    private ddwService: DropdownService,
    private authenticationService: AuthenticationService
  ) {
    super();
    //CPF> Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)]
  }

  ngOnInit() {
    this.localeService.use('pt-br');
    this.formulario = this.formBuilder.group({
      id: [null],
      codigo: [''],
      tratamento: [null, [Validators.required, Validators.minLength(3)]],
      img: [null],
      nome: [null, Validators.required],
      apelido: [null],
      cpf: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      estadoCivil: [null],
      sexo: [null],
      email: [null, [Validators.required, Validators.email]],
      link: [null, Validators.required]
    });

    this.estadosCivis = this.ddwService.getEstadoCivil();
    this.sexoGeneros = this.ddwService.getOpcaoGeneros();

    let currentUser = this.authenticationService.currentUserValue;

    this.pflService.recuperarPerfil(currentUser.id)
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        this.inicializarFormPessoal(retorno);
      });
  }

  inicializarFormPessoal(perfil: UsuarioPerfil) {
    var datePipe=new DatePipe("en-US");
    if (perfil) {
      this.formulario.patchValue({
        id: perfil.id,
        codigo: perfil.codigo,
        tratamento: perfil.tratamento,
        img: perfil.img,
        nome: perfil.nome,
        apelido: perfil.apelido,
        cpf: perfil.cpf,
        dataNascimento: datePipe.transform(perfil.dataNascimento,'dd-MM-yyyy'),
        estadoCivil: perfil.estadoCivil,
        sexo: perfil.sexo,
        email: perfil.email,
        link: perfil.link
      });
      if(null != this.formulario.value['img']){
        this.imgUsuario = this.formulario.value['img'];
      }
    }
  }

  openModal(tpltMudaSenha: TemplateRef<any>) {
    this.modalMudaSenha = this.modalService.show(tpltMudaSenha);
  }

  submit() {
    this.formulario.patchValue({dataNascimento:moment(this.formulario.value['dataNascimento'], 'DD-MM-YYYY')});
    this.pflService.atualizarPerfil(this.formulario.value['id'], JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.formulario.patchValue({dataNascimento: this.formulario.value['dataNascimento'].format('DD-MM-YYYY')});
        this.altService.showAlertSuccess('Dados Pessoais atualizados com sucesso!');
      },
      (error: any) => {
        console.log(error);
        this.altService.showAlertWarning('Erro ao tentar atualizar Dados Pessoais!');
      });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
