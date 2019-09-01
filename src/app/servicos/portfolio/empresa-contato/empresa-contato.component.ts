import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable, Subject, empty } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { DropdownService } from 'src/app/shared/service/dropdown.service';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';
import { Paises } from 'src/app/shared/model/paises';
import { EstadosBr } from 'src/app/shared/model/estados-br';
import { CidadesBr } from 'src/app/shared/model/cidades-br';
import { tap, switchMap, map, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { EnderecoViaCep } from 'src/app/shared/model/endereco-viacep';

@Component({
  selector: 'app-empresa-contato',
  templateUrl: './empresa-contato.component.html',
  styleUrls: ['./empresa-contato.component.scss']
})
export class EmpresaContatoComponent extends FormBasicComponent implements OnInit {

  @Input() modal: BsModalRef;

  paises: Observable<Paises[]>;
  estados: EstadosBr[];
  cidades: CidadesBr[];
  icEnderecoBr: boolean;

  unsub$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private ddwService: DropdownService
  ) { 
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      pais: ['', Validators.required],
      cep: [null, [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      endereco: [null, Validators.required],
      numero: [null],
      complemento: [null],
      bairro: [null],
      estado: ['', Validators.required],
      cidadeId: ['', Validators.required],
      cidade: ['', Validators.required],
      telefone: [null],
      celular01: [null],
      celular01WS: [false],
      celular02: [null],
      celular02WS: [false],
      email: [null, Validators.email],
    });

    this.paises = this.ddwService.getPaises();

    this.formulario.get('pais').valueChanges
      .pipe(
        tap(value => this.limparCombosUF()),
        switchMap(value => {
          if (value === 'BRA') {
            this.icEnderecoBr = true;
            return this.ddwService.getEstadosBr();
          }
          this.icEnderecoBr = false;
          return empty();
        })
      )
      .subscribe(estados => this.estados = estados);

    this.formulario.get('estado').valueChanges
      .pipe(
        map(uf => uf ? uf : empty()),
        switchMap((uf: string) => this.ddwService.getCidadesBr(uf)),
        takeUntil(this.unsub$)
      )
      .subscribe(cidades => this.cidades = cidades);

    this.formulario.get('cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(status => status === 'VALID' ? this.ddwService.getEnderecoBr(this.formulario.get('cep').value) : empty()),
        takeUntil(this.unsub$)
      )
      .subscribe(retorno => retorno.cep ? this.atualizarEndereco(retorno) : {});
  }

  atualizarEndereco(endereco: EnderecoViaCep){
    this.formulario.patchValue({
      endereco: endereco.logradouro,
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
  }

  submit() {
    this.modal.hide();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
