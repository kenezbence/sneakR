// webshop-cart.component.ts
import { Component } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-webshop-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './webshop-cart.component.html',
  styleUrls: ['./webshop-cart.component.css']
})
export class WebshopCartComponent {
  showCard = false;

  constructor(public cartService: CartService) {}

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  showCardDetails(paymentMethod: string) {
    this.showCard = paymentMethod === 'bankkártya';
  }

  checkout() {
    // Implement backend integration here
    alert('Köszönjük a vásárlást! A rendelését feldolgozzuk.');
    this.cartService.clearCart();
  }
}