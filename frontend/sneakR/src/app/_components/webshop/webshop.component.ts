import { Component } from '@angular/core';

@Component({
  selector: 'app-webshop',
  standalone: true,
  imports: [],
  templateUrl: './webshop.component.html',
  styleUrl: './webshop.component.css'
})
export class WebshopComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Scroll lock, ha a menü nyitva van
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}