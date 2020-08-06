import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UsuarioEndereco } from './model/usuario-endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly API = `${environment.API}endereco`;
  //private readonly API = `${environment.API}usuarios`;

  constructor(private http: HttpClient) { }
  
  recuperarEndereco(id: number){
    return this.http.get<UsuarioEndereco>(`${this.API}/${id}`).pipe(take(1));
    // return this.http.get<UsuarioEndereco>(`${this.API}/${id}/endereco`).pipe(take(1));
  }

  atualizarEndereco(id: number, json: string){
    return this.http.put(`${this.API}/${id}`, json).pipe(take(1));
    //return this.http.put(`${this.API}/${id}/endereco`, json).pipe(take(1));
  }
}
