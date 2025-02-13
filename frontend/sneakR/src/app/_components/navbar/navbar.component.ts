import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartCount = 2; // Update this with actual cart data
  isMenuActive = false;
  qualityMenuActive = false;
  brandMenuActive = false;
  brands = ['Jordan', 'Nike', 'Adidas', 'Yeezy', 'New Balance', 'Alexander McQueen', 'Travis Scott', 'Reebok', 'Converse', 'Puma'];

  constructor(private router: Router) {}

  
  navigateToTarget3() {
    this.router.navigate(['/select']);
  }

  
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  toggleQualityMenu() {
    this.qualityMenuActive = !this.qualityMenuActive;
  }

  toggleBrandMenu() {
    this.brandMenuActive = !this.brandMenuActive;
  }

  filterByCategory(category: string) {
    this.router.navigate(['/resell-products'], { queryParams: { gender: category } });
    this.closeMenu();
  }

  filterByQuality(quality: string) {
    this.router.navigate(['/resell-products'], { queryParams: { condition: quality } });
    this.closeMenu();
  }

  filterByBrand(brand: string) {
    this.router.navigate(['/resell-products'], { queryParams: { brand: brand } });
    this.closeMenu();
  }

  private closeMenu() {
    this.isMenuActive = false;
  }
}