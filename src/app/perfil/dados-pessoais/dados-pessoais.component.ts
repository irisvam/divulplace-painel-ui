import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PerfilService } from '../service/perfil.service';
import { DropdownService } from 'src/app/shared/service/dropdown.service';

import { EstadoCivil } from 'src/app/shared/model/estado-civil';
import { UsuarioPerfil } from '../service/model/usuario-perfil';
import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent extends FormBasicComponent implements OnInit, OnDestroy {

  modalMudaSenha: BsModalRef;
  imgUsuario = "/assets/img/user.png";
  opcaoMF: any[];
  estadosCivis: Observable<EstadoCivil[]>;

  unsub$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private pflService: PerfilService,
    private ddwService: DropdownService
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
      sobre: [null],
      email: [null, [Validators.required, Validators.email]],
      link: [null, Validators.required]
    });

    this.estadosCivis = this.ddwService.getEstadoCivil();
    this.opcaoMF = this.ddwService.getOpcaoMF();

    this.pflService.recuperarPerfil(1)
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        this.inicializarFormPessoal(retorno);
      });
  }

  inicializarFormPessoal(perfil: UsuarioPerfil) {
    if (perfil) {
      this.formulario.patchValue({
        id: perfil.id,
        codigo: perfil.codigo,
        tratamento: perfil.tratamento,
        img: perfil.img,
        nome: perfil.nome,
        apelido: perfil.apelido,
        cpf: perfil.cpf,
        dataNascimento: perfil.dataNascimento,
        estadoCivil: perfil.estadoCivil,
        sexo: perfil.sexo,
        sobre: perfil.sobre,
        email: perfil.email,
        link: perfil.link
      });
      this.imgUsuario = this.formulario.value['img'];
    }
  }

  openModal(tpltMudaSenha: TemplateRef<any>) {
    this.modalMudaSenha = this.modalService.show(tpltMudaSenha);
  }

  submit() {
    this.pflService.atualizarPerfil(this.formulario.value['id'], JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
      },
      (error: any) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
