import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecadoService {

  private readonly API = `${environment.API}recados`;
  
  constructor(private http: HttpClient) { }

  listarRecentes(){
    return this.http.get<RecadoResumo[]>(this.API);
  }
}
