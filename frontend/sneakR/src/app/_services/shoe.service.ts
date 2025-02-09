// shoe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Shoe {
  ar: number;
  img: string;
  nev: string;
}

interface ShoesResponse {
  shoes: Shoe[];
  statusCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  private apiUrl = 'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/cipok/getShoesNamePrice';

  constructor(private http: HttpClient) { }

  getShoes(): Observable<ShoesResponse> {
    return this.http.get<ShoesResponse>(this.apiUrl);
  }
}