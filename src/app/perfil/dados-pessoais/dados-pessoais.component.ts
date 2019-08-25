import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PerfilService } from '../service/perfil.service';
import { DropdownService } from 'src/app/shared/service/dropdown.service';

import { EstadoCivil } from 'src/app/shared/model/estado-civil';
import { UsuarioPerfil } from '../service/model/usuario-perfil';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit, OnDestroy {

  modalMudaSenha: BsModalRef;
  formPessoal: FormGroup;
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

    this.formPessoal = this.formBuilder.group({
      id: [null],
      tratamento: [null, Validators.required],
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
  }

  ngOnInit() {
    this.localeService.use('pt-br');

    this.estadosCivis = this.ddwService.getEstadoCivil();
    this.opcaoMF = this.ddwService.getOpcaoMF();

    this.pflService.recuperarPerfil(1)
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        this.inicializarFormPessoal(retorno);
        this.imgUsuario = this.formPessoal.value['img'];
      });
  }

  inicializarFormPessoal(perfil: UsuarioPerfil) {
    if (perfil) {
      this.formPessoal.patchValue({
        id: perfil.id,
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
    }
  }

  openModal(tpltMudaSenha: TemplateRef<any>) {
    this.modalMudaSenha = this.modalService.show(tpltMudaSenha);
  }

  onSubmit() {
    if (this.formPessoal.valid) {
      this.pflService.atualizarPerfil(this.formPessoal.value['id'], JSON.stringify(this.formPessoal.value))
        .pipe(takeUntil(this.unsub$))
        .subscribe(retorno => {
          console.log(retorno);
        },
          (error: any) => {
            console.log(error);
          });
    } else {
      this.verificarValidacoes(this.formPessoal);
    }
  }

  selecionarSexo(valor: string) {
    this.formPessoal.get('sexo').setValue(valor);
  }

  selecionarEstadoCivil(valor: string) {
    this.formPessoal.get('estadoCivil').setValue(valor);
  }

  verificarValidacoes(formFroup: FormGroup) {
    Object.keys(formFroup.controls).forEach(element => {
      const control = formFroup.get(element);
      if (control instanceof FormGroup) {
        this.verificarValidacoes(control);
      }
      control.markAsDirty();
    });
  }

  verificarTouched(campo: string) {
    return this.formPessoal.get(campo).touched || this.formPessoal.get(campo).dirty;
  }

  verificarValidTouched(campo: string) {
    return this.formPessoal.get(campo).valid && this.verificarTouched(campo);
  }

  verificarInvalidTouched(campo: string) {
    return !this.formPessoal.get(campo).valid && this.verificarTouched(campo);
  }

  verificarErroCss(campo: string) {
    return {
      'has-error': this.verificarInvalidTouched(campo),
      'has-success': this.verificarValidTouched(campo),
      'has-feedback': this.verificarTouched(campo),
    }
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
