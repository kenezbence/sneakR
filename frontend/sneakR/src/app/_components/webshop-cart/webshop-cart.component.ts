import { Component } from '@angular/core';
import { CartService, CartProduct } from '../../_services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-webshop-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './webshop-cart.component.html',
  styleUrls: ['./webshop-cart.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class WebshopCartComponent {
  currentStep = 1;
  showCard = false;
  cartItems: CartProduct[] = [];
  selectedPayment: 'card' | 'cash' | null = null;
  shippingCost = 1500; // Fixed shipping cost in HUF
  showSuccessModal = true;
  constructor(public cartService: CartService) {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  selectPayment(method: 'card' | 'cash') {
    this.selectedPayment = method;
    this.showCard = method === 'card';
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    } else {
      this.checkout();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.cartItems.length > 0;
      case 2:
        return true; // Add form validation check here
      case 3:
        return !!this.selectedPayment;
      default:
        return false;
    }
  }

  checkout() {
    alert('Köszönjük a vásárlást! A rendelését feldolgozzuk.');
    this.cartService.clearCart();
  }


  
}