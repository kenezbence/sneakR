import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LakcimService {
  private baseUrl = 'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/lakcimek';

  constructor(private http: HttpClient) { }

  insertLakcim(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insertLakcim`, data);
  }

  getAllLakcim(): Observable<any> {
  return this.http.get(`${this.baseUrl}/getAllLakcim`);
}

}