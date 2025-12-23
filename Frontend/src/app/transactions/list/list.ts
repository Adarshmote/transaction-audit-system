import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransactionService } from '../../services/transactions';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class ListComponent implements OnInit {

  transactions: any[] = [];

  constructor(private txService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.txService.getAllTransactions().subscribe({
      next: (data: any[]) => {
        this.transactions = data;
      },
      error: (err) => {
        console.error('Failed to load transactions', err);
      }
    });
  }
}
