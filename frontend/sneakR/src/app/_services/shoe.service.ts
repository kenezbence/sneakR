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

getAllShoesData(): Observable<any> {
  return this.http.get(this.apiUrl).pipe(
    map((res: any) => res.shoes || []) // Correctly extract 'shoes' array
  );
}
updateShoeBuyer(id: number, userId: number): Observable<any> {
    const url = `http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/cipok/updateShoeBuyer/${id}`;
    return this.http.put(url, { userId });
  }
uploadShoe(shoeData: any): Observable<any> {
  const uploadUrl = 'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/cipok/uploadShoes';
  return this.http.post(uploadUrl, shoeData);
}

updateShoe(id: number, shoeData: any): Observable<any> {
  const updateUrl = `http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/cipok/updateShoe/${id}`;
  return this.http.put(updateUrl, shoeData);
}

deleteShoe(id: number): Observable<any> {
  const deleteUrl = `http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/cipok/deleteShoes/${id}`;
  return this.http.delete(deleteUrl);
}

  getShoes() {
  return this.http.get<{ shoes: any[] }>(this.apiUrl).pipe(
    map(response => response.shoes
      .map(shoe => ({
        id: shoe.id,
        name: shoe.nev,
        brand: shoe.marka,
        price: shoe.ar,
        sizes: [shoe.meret],
        image: shoe.img,
        model: shoe.model,
        category: shoe.category,
        userId: shoe.user_id // Add userId from backend response
      } as Product))
      .filter(product => !product.userId) // Exclude products with userId
    )
  );
}


  getShoeById(id: number): Observable<any> {
  const url = `http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/cipok/getShoeById/${id}`;
  return this.http.get(url);
}
}