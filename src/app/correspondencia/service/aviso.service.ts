import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AvisoResumo } from './model/avisoResumo';
import { AvisoSistema } from './model/avisoSistema';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private readonly API = `${environment.API}avisos`;

  constructor(private http: HttpClient) { }
  
  listarResumo(){
    return this.http.get<AvisoResumo[]>(`${this.API}_resumo`);
  }
  
  listarAvisos(){
    return this.http.get<AvisoSistema[]>(this.API);
  }

  receberAviso(id: number){
    return this.http.get<AvisoSistema>(`${this.API}/${id}`).pipe(take(1));
  }
}
