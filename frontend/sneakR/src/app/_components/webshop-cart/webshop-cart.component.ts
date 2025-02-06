// webshop-cart.component.ts
import { Component } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-webshop-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './webshop-cart.component.html',
  styleUrls: ['./webshop-cart.component.css']
})
export class WebshopCartComponent {
  constructor(public cartService: CartService) {}

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  checkout() {
    // Itt lehetne fizetési logika
    alert('Köszönjük a vásárlást!');
    this.cartService.clearCart();
  }
}