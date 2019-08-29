import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DropdownService } from 'src/app/shared/service/dropdown.service';
import { Observable, empty, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap, distinctUntilChanged } from 'rxjs/operators';

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
      cidade: ['', Validators.required]
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
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
