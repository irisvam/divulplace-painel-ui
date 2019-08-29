import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take, map } from 'rxjs/operators';

import { EstadoCivil } from '../model/estado-civil';
import { EstadosBr } from '../model/estados-br';
import { Paises } from '../model/paises';
import { EnderecoViaCep } from '../model/endereco-viacep';
import { CidadesBr } from '../model/cidades-br';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  estados: EstadosBr[];

  constructor(private http: HttpClient) { }

  getEstadoCivil() {
    return this.http.get<EstadoCivil[]>('assets/json/estadocivil.json').pipe(take(1));
  }

  getOpcaoSN() {
    return [
      { opcao: 'S', descricao: 'Sim' },
      { opcao: 'N', descricao: 'Não' }
    ];
  }

  getOpcaoMF() {
    return [
      { opcao: 'M', descricao: 'Masculino' },
      { opcao: 'F', descricao: 'Feminino' }
    ];
  }

  /* https://restcountries.eu/ */
  getPaises() {
    return this.http.get<Paises[]>('assets/json/paises.json').pipe(take(1));
  }

  /* https://servicodados.ibge.gov.br/api/docs/localidades */
  getEstadosBr() {
    return this.http.get<EstadosBr[]>('assets/json/estadosbr.json').pipe(take(1));
  }

  /* https://jsonformatter.org/ */
  getCidadesBr(uf: string){
    return this.http.get<CidadesBr[]>('assets/json/cidadesbr.json')
      .pipe(map((cidade: CidadesBr[]) => cidade.filter(c => c.sigla == uf)));
  }

  /* https://viacep.com.br/ */
  getEnderecoBr(cep: string){
    return this.http.get<EnderecoViaCep>(`https://viacep.com.br/ws/${cep}/json/`).pipe(take(1));
  }
}
