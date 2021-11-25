import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { RetornoCadastro } from 'src/app/shared/model/retorno-cadastro';
import { ServicoProduto } from './model/servico-produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = `/api/portfolio`;

  private opcoes = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }
  
  recuperarProdutos(id: number){
    return this.http.get<ServicoProduto[]>(`${this.API}/${id}/produtos`).pipe();
  }

  recuperarProduto(id: number){
    return this.http.get<ServicoProduto>(`${this.API}/produtos/${id}`).pipe(take(1));
  }

  cadastrarProduto(id: number, json: string){
    return this.http.post<RetornoCadastro>(`${this.API}/${id}/produtos`, json, this.opcoes).pipe(take(1));
  }

  atualizarProduto(id: number, json: string){
    return this.http.put(`${this.API}/produtos/${id}`, json, this.opcoes).pipe(take(1));
  }

  deletarProduto(id: number){
    return this.http.delete(`${this.API}/produtos/${id}`).pipe(take(1));
  }

  upload(id: number, files: File[]){
    const formData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));

    return this.http.post(`${this.API}/produtos/${id}/imagens`, formData).pipe(take(1));
  }

}
