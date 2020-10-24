import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DropdownService } from 'src/app/shared/service/dropdown.service';
import { Observable, empty, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap, distinctUntilChanged } from 'rxjs/operators';
import { EnderecoService } from '../service/endereco.service';
import { AuthenticationService } from 'src/app/login/_services/authentication.service';

import { UsuarioEndereco } from '../service/model/usuario-endereco';
import { EstadosBr } from 'src/app/shared/model/estados-br';
import { Paises } from 'src/app/shared/model/paises';
import { CidadesBr } from 'src/app/shared/model/cidades-br';
import { EnderecoViaCep } from 'src/app/shared/model/endereco-viacep';
import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent extends FormBasicComponent implements OnInit, OnDestroy {

  paises: Observable<Paises[]>;
  estados: EstadosBr[];
  cidades: CidadesBr[];
  icEnderecoBr: boolean;
  idUsuario: number;

  unsub$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private ddwService: DropdownService,
    private endService: EnderecoService,
    private authenticationService: AuthenticationService
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      pais: ['', Validators.required],
      cep: [null],
      logradouro: [null, Validators.required],
      numero: [null],
      complemento: [null],
      bairro: [null],
      estado: [''],
      cidadeId: [null],
      cidade: ['']
    });

    this.paises = this.ddwService.getPaises();

    this.formulario.get('pais').valueChanges
      .pipe(
        tap(value => this.limparCombosUF()),
        switchMap(value => {
          if (value === 'BRA') {
            this.icEnderecoBr = true;
            this.formulario.get('cidade').setValidators([]);
            this.formulario.get('cep').setValidators(Validators.pattern(/^[0-9]{8}$/));
            this.formulario.get('estado').setValidators(Validators.required);
            this.formulario.get('cidadeId').setValidators(Validators.required);
            return this.ddwService.getEstadosBr();
          } else {
            this.formulario.get('cep').setValidators([]);
            this.formulario.get('cidade').setValidators(Validators.required);
          }
          this.icEnderecoBr = false;
          return empty();
        })
      )
      .subscribe(estados => this.estados = estados);

    this.formulario.get('estado').valueChanges
      .pipe(
        map(uf => uf ? uf : empty()),
        switchMap(uf => {
          this.formulario.get('cidadeId').setValue('');
          if (uf !== '') {
            return this.ddwService.getCidadesBr(uf);
          }
          return empty();
          }),
        takeUntil(this.unsub$)
      )
      .subscribe(cidades => this.cidades = cidades);

      /**
    this.formulario.get('cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(status => status === 'VALID' && null != this.formulario.get('cep').value ? this.ddwService.getEnderecoBr(this.formulario.get('cep').value) : empty()),
        takeUntil(this.unsub$)
      )
      .subscribe(retorno => {
        this.atualizarEndereco(retorno);
      },
      (error: any) => {
        console.log(error);
      }); **/

    this.idUsuario = this.authenticationService.currentUserValue.id;

    this.endService.recuperarEndereco(this.idUsuario)
    .pipe(takeUntil(this.unsub$))
    .subscribe(retorno => {
      this.inicializarFormEndereco(retorno);
    });
  }

  inicializarFormEndereco(endereco: UsuarioEndereco) {
    if (endereco) {
      this.formulario.patchValue({
        id: endereco.id,
        pais: endereco.pais,
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        estado: endereco.estado,
        cidadeId: endereco.cidadeId,
        cidade: endereco.cidade
      });
    }
  }

  atualizarEndereco(endereco: EnderecoViaCep){
    this.formulario.patchValue({
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      estado: endereco.uf,
      cidadeId: endereco.ibge,
      cidade: endereco.localidade
    });
  }

  limparCombosUF(){
    this.estados = null; 
    this.cidades = null
    this.formulario.get('estado').setValue('');
    this.formulario.get('cidadeId').setValue('');
    this.formulario.get('cidade').setValue('');
  }

  submit() {
    if(null == this.formulario.value['id']){
      this.cadastrar();
    } else {
      this.atualizar();
    }
  }

  cadastrar(){
    this.endService.cadastrarEndereco(this.idUsuario, JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.formulario.patchValue({id: retorno.id});
      },
      (error: any) => {
        console.log(error);
      });
  }

  atualizar(){
    this.endService.atualizarEndereco(this.idUsuario, JSON.stringify(this.formulario.value))
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
