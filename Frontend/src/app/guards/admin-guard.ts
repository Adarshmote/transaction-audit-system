import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Check if we're in the browser before using localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token === 'active') {
      return true; // allow dashboard access
    }
  }

  // Redirect to admin login if no token or not in browser
  router.navigate(['/admin-login']);
  return false;
};
