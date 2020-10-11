import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UsuarioPerfil } from './model/usuario-perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  //private readonly API = `${environment.API}usuarios`;
  private readonly API = '/api/perfil';
  
  private opcoes = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  
  constructor(private http: HttpClient) { }

  recuperarPerfil(id: number){
    return this.http.get<UsuarioPerfil>(`${this.API}/${id}`).pipe(take(1));
  }

  atualizarPerfil(id: number, json: string){
    return this.http.put(`${this.API}/${id}`, json, this.opcoes).pipe(take(1));
  }
}
