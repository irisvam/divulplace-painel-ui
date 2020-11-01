import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LinkSocial } from './model/link-social';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private readonly API = `/api/social`;

  private opcoes = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  
  constructor(private http: HttpClient) { }
  
  recuperarRedesSociais(id: number){
    
    return this.http.get<LinkSocial[]>(`${this.API}/${id}`).pipe();
  }

}
