import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Novidade } from './model/novidade';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly API = `${environment.API}novidades`;
  
  constructor(private http: HttpClient) { }
  
  listar(){
    return this.http.get<Novidade[]>(this.API);
  }
}
