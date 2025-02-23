import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RendelesService {
  private baseUrl = 'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/rendelesek';

  constructor(private http: HttpClient) { }

  insertRendeles(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insertRendeles`, data);
  }
}