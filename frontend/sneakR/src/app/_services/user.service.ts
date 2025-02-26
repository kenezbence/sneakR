// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserResponse } from '../models/user.model';

interface UserApiResponse {
  users: any[];
  statusCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/userek';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserApiResponse> {
    return this.http.get<UserApiResponse>(`${this.baseUrl}/getAllUsers`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${userId}`);
  }
}