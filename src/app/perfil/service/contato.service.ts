import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';

import { UsuarioContato } from './model/usuario-contato';
import { RetornoCadastro } from 'src/app/shared/model/retorno-cadastro';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly API = `/api/contato`;

  private opcoes = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  recuperarContato(id: number){

    return this.http.get<UsuarioContato>(`${this.API}/${id}`).pipe(take(1));
  }

  cadastrarContato(id: number, json: string){

    return this.http.post<RetornoCadastro>(`${this.API}/${id}`, json, this.opcoes).pipe(take(1));
  }

  atualizarContato(id: number, json: string){

    return this.http.put(`${this.API}/${id}`, json, this.opcoes).pipe(take(1));
  }

}
