import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  //private readonly API = `${environment.API}`;
  private readonly API = '/api/auth';
  
  private opcoes = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }
  
  cadastrarRegistro(json: string){
    return this.http.post(`${this.API}/signup`, json, this.opcoes).pipe(take(1));
  }
}
