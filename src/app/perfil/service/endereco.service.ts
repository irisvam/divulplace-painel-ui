import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UsuarioEndereco } from './model/usuario-endereco';
import { RetornoCadastro } from 'src/app/shared/model/retorno-cadastro';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly API = `/api/endereco`;
  //private readonly API = `${environment.API}usuarios`;
  
  private opcoes = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }
  
  recuperarEndereco(id: number){
    return this.http.get<UsuarioEndereco>(`${this.API}/${id}`).pipe(take(1));
    // return this.http.get<UsuarioEndereco>(`${this.API}/${id}/endereco`).pipe(take(1));
  }

  cadastrarEndereco(id: number, json: string){
    return this.http.post<RetornoCadastro>(`${this.API}/${id}`, json, this.opcoes).pipe(take(1));
    //return this.http.put(`${this.API}/${id}/endereco`, json).pipe(take(1));
  }

  atualizarEndereco(id: number, json: string){
    return this.http.put(`${this.API}/${id}`, json, this.opcoes).pipe(take(1));
    //return this.http.put(`${this.API}/${id}/endereco`, json).pipe(take(1));
  }
}
