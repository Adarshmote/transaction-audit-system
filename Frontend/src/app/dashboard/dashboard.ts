import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transactions';
import { NavbarComponent } from '../shared/navbar/navbar';
import { TransferComponent } from '../transactions/transfer/transfer';
import { ListComponent } from '../transactions/list/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    TransferComponent,
    ListComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  transferData = {
    senderId: '',
    receiverId: '',
    amount: null
  };

  transactions: any[] = [];
  successMessage = '';
  errorMessage = '';
  message = '';
  loading = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  onTransfer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // convert string inputs to number
    const payload = {
      senderId: Number(this.transferData.senderId),
      receiverId: Number(this.transferData.receiverId),
      amount: Number(this.transferData.amount)
    };

    // basic validation
    if (payload.senderId <= 0 || payload.receiverId <= 0 || payload.amount <= 0) {
      this.errorMessage = 'All fields are required and must be valid numbers';
      return;
    }

    this.loading = true;

    this.transactionService.transferFunds(payload).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Transfer successful';
        this.loading = false;
        this.loadTransactions(); // refresh transaction list
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Transfer failed';
        this.loading = false;
      }
    });
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (res: any) => {
        this.transactions = res;
      },
      error: () => {
        this.message = 'Failed to load transactions';
      }
    });
  }

  resetForm(): void {
    this.transferData = {
      senderId: '',
      receiverId: '',
      amount: null
    };
  }
}
