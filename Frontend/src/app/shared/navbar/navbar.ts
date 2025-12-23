import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed if you use *ngIf, *ngFor

@Component({
  selector: 'app-navbar',   // ✅ correct selector
  standalone: true,         // ✅ allows use in other standalone components
  imports: [CommonModule],  // optional, only if using *ngIf, *ngFor
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'] // ✅ correct property name
})
export class NavbarComponent {
  // Optional: nav logic here
}
