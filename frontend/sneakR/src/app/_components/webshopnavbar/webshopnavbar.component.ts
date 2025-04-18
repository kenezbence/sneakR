import { Component, OnInit, OnDestroy, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, CartProduct } from '../../_services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-webshopnavbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './webshopnavbar.component.html',
  styleUrls: ['./webshopnavbar.component.css']
})
export class WebshopnavbarComponent implements OnInit, OnDestroy {
  cartCount = 0;
  cartItems: CartProduct[] = [];
  showCartMenu = false;
  isMenuActive = false;
  menuState: { [key: string]: boolean } = {};
  private cartSubscription!: Subscription;

  constructor(private router: Router, private cartService: CartService, private renderer: Renderer2, ) {}

  @ViewChild('best') bestSection!: ElementRef;
  ngOnInit() {
    this.cartSubscription = this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.cartCount = cart.length;
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (!(e.target as Element).closest('.cart-wrapper')) {
        this.showCartMenu = false;
      }
    });
  }

  toggleCartMenu() {
    this.showCartMenu = !this.showCartMenu;
  }

  navigateToCart() {
    this.showCartMenu = false;
    this.router.navigate(['/webshop-cart']);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  navigateToTarget3() {
    this.router.navigate(['/select']);
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    if (!this.isMenuActive) {
      this.menuState = {};
    }
  }

  toggleSubmenu(menuKey: string) {
    this.menuState[menuKey] = !this.menuState[menuKey];
  }
  scrollToBest() {
    if (this.bestSection) {
      this.bestSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}