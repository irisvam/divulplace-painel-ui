import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { RetornoCadastro } from 'src/app/shared/model/retorno-cadastro';
import { ServicoEmpresa } from './model/servico-empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = `/api/portfolio`;

  private opcoes = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }
  
  recuperarEmpresas(id: number){
    return this.http.get<ServicoEmpresa[]>(`${this.API}/${id}/empresas`).pipe();
  }

  recuperarEmpresa(id: number){
    return this.http.get<ServicoEmpresa>(`${this.API}/empresas/${id}`).pipe(take(1));
  }

  cadastrarEmpresa(id: number, json: string){
    return this.http.post<RetornoCadastro>(`${this.API}/${id}/empresas`, json, this.opcoes).pipe(take(1));
  }

  atualizarEmpresa(id: number, json: string){
    return this.http.put(`${this.API}/empresas/${id}`, json, this.opcoes).pipe(take(1));
  }

  deletarEmpresa(id: number){
    return this.http.delete(`${this.API}/empresas/${id}`).pipe(take(1));
  }

  upload(id: number, files: File[]){
    const formData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));

    return this.http.post(`${this.API}/empresas/${id}/imagens`, formData).pipe(take(1));
  }
}
