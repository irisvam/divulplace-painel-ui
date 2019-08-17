import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecadoService {

  private readonly API = `${environment.API}recados`;
  
  constructor(private http: HttpClient) { }

  listarRecentes(){
    return this.http.get<RecadoResumo[]>(this.API);
  }

  listarRecados(){
    return this.http.get<RecadoRecebido[]>(`${this.API}_recebidos`);
  }

  receberRecado(id: number){
    return this.http.get<RecadoCliente>(`${this.API}_id/${id}`).pipe(take(1));
  }
}
