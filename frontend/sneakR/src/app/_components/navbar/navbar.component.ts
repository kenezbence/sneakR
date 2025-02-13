import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResellCartService } from '../../_services/resell-cart.service'; // Új import
import { Subscription } from 'rxjs'; // Új import

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount = 0;
  isMenuActive = false;
  qualityMenuActive = false;
  brandMenuActive = false;
  brands = ['Jordan', 'Nike', 'Adidas', 'Yeezy', 'New Balance', 'Alexander McQueen', 'Travis Scott', 'Reebok', 'Converse', 'Puma'];
  private cartSubscription!: Subscription; // Új változó

  constructor(
    private router: Router,
    private cartService: ResellCartService // Service injektálás
  ) {}

  ngOnInit() {
    // Feliratkozás a kosár változásokra
    this.cartSubscription = this.cartService.getCart().subscribe(cart => {
      this.cartCount = cart.length;
    });
  }

  ngOnDestroy() {
    // Leiratkozás a memóriaszivárgás elkerüléséért
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // ... (egyéb metódusok változatlanok)

  
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