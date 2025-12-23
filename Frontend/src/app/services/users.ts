import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  // Get single user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }

  // Optional: update user balance
  updateUserBalance(id: number, balance: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, { balance });
  }
}
