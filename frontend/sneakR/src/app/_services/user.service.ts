// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserResponse } from '../models/user.model';

interface UserApiResponse {
  users: {
    id: number;
    nev: string;
    email: string;
    jelszo: string;
    admin: string;
  }[];
  statusCode: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/userek/getAllUsers';

  constructor(private http: HttpClient) { }

  

  getAllUsers() {
    return this.http.get<UserResponse>(`${'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/userek/getAllUsers'}`); // <-- UserResponse típus
  }

  deleteUser(userId: number) {
    return this.http.delete(`${'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/userek/deleteUser'}/${userId}`); // <-- A végpont helyes legyen
  }

}