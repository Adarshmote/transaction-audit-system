import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transactions';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer.html',
  styleUrls: ['./transfer.css']
})
export class TransferComponent {

  transferData = {
    senderId: 0,
    receiverId: 0,
    amount: 0
  };

  successMessage = '';
  errorMessage = '';

  constructor(private txService: TransactionService) {}

  transfer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // ✅ Cast values to numbers
    const senderIdNum = Number(this.transferData.senderId);
    const receiverIdNum = Number(this.transferData.receiverId);
    const amountNum = Number(this.transferData.amount);

    // Basic validation
    if (isNaN(senderIdNum) || isNaN(receiverIdNum) || isNaN(amountNum) ||
        senderIdNum <= 0 || receiverIdNum <= 0 || amountNum <= 0) {
      this.errorMessage = 'All fields are required and must be valid numbers';
      return;
    }

    const payload = {
      senderId: senderIdNum,
      receiverId: receiverIdNum,
      amount: amountNum
    };

    console.log('Payload:', payload,
                'Sender type:', typeof payload.senderId,
                'Receiver type:', typeof payload.receiverId,
                'Amount type:', typeof payload.amount);

    this.txService.transferFunds(payload).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Transfer successful';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Transfer failed';
        this.successMessage = '';
      }
    });
  }
}
