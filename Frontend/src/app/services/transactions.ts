import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Get all transactions
  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions`).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return of([]); // prevent UI crash
      })
    );
  }

  // Transfer funds (userId as NUMBER)
  transferFunds(data: {
    senderId: number;
    receiverId: number;
    amount: number;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/transactions/transfer`,
      data
    );
  }
}
