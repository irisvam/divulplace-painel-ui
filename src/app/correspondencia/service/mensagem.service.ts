import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private readonly API = `${environment.API}mensagens`;

  constructor(private http: HttpClient) { }

  listarRecentes(){
    return this.http.get<MensagemResumo[]>(this.API);
  }

  listarAfiliados(){
    return this.http.get<MensagemQuantidade[]>(`${this.API}_qtde`);
  }

  listarMensagens() {
    return this.http.get<MensagemAfiliado[]>(`${this.API}_afiliado`);
  }
}
