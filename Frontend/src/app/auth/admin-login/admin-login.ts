import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // ✅ Admin Login Logic
  login(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    // 🔐 Simple hardcoded admin check (project purpose)
    if (username === 'admin' && password === 'admin123') {

      // Save admin session
      localStorage.setItem('adminToken', 'active');

      // Redirect to dashboard
      this.router.navigate(['/dashboard']);

    } else {
      this.errorMessage = 'Invalid Admin Credentials';
    }
  }
}
