import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { RetornoCadastro } from 'src/app/shared/model/retorno-cadastro';
import { ServicoConsultor } from './model/servico-consultor';

@Injectable({
  providedIn: 'root'
})
export class ConsultorService {

  private readonly API = `/api/portfolio`;

  private opcoes = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  recuperarServicos(id: number){
    return this.http.get<ServicoConsultor[]>(`${this.API}/${id}/servicos`).pipe();
  }

  recuperarServico(id: number){
    return this.http.get<ServicoConsultor>(`${this.API}/servicos/${id}`).pipe(take(1));
  }

  cadastrarServico(id: number, json: string){
    return this.http.post<RetornoCadastro>(`${this.API}/${id}/servicos`, json, this.opcoes).pipe(take(1));
  }

  atualizarServico(id: number, json: string){
    return this.http.put(`${this.API}/servicos/${id}`, json, this.opcoes).pipe(take(1));
  }

  deletarServico(id: number){
    return this.http.delete(`${this.API}/servicos/${id}`).pipe(take(1));
  }

  upload(id: number, files: Set<File>){
    const formData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));

    return this.http.post(`${this.API}/servicos/${id}/imagens`, formData).pipe(take(1));
  }

}
