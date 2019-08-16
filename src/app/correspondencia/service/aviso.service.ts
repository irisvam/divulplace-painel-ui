import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private readonly API = `${environment.API}avisos_resumo`;

  constructor(private http: HttpClient) { }
  
  listarResumo(){
    return this.http.get<AvisoResumo[]>(this.API);
  }
}
