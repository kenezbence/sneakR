// shoe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './product.service';

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
  private apiUrl = 'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/cipok/getAllShoesData';

  constructor(private http: HttpClient) { }

  getShoes() {
    return this.http.get<{ shoes: any[] }>(this.apiUrl).pipe(
      map(response => response.shoes.map(shoe => ({
        id: shoe.id,
        name: shoe.nev,
        brand: shoe.marka,
        price: shoe.ar,
        sizes: [shoe.meret], // Convert single size to array
        image: shoe.img,
        model: shoe.model,
        category: shoe.category
      } as Product)))
    );
  }
}