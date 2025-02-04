import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-webshopnavbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './webshopnavbar.component.html',
  styleUrl: './webshopnavbar.component.css'
})
export class WebshopnavbarComponent {
  cartCount = 2; // Update this with actual cart data
  isMenuActive = false;

  constructor(private router: Router) {}

  navigateToTarget3() {
    this.router.navigate(['/select']);
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
}