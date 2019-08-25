import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { EstadoCivil } from '../model/estado-civil';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

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
}
