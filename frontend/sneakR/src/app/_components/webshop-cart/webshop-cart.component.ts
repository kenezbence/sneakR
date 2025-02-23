import { Component } from '@angular/core';
import { CartService, CartProduct } from '../../_services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LakcimService } from '../../_services/lakcim.service';
import { RendelesService } from '../../_services/rendeles.service';
import { ShoeService } from '../../_services/shoe.service';

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
  shippingCost = 1890; 
  showSuccessModal = false;
  currentUser: any;
  szallitasiCimId: number | null = null;
  shippingForm = {
    phone: '',
    city: '',
    postalCode: '',
    street: ''
  };

  constructor(public cartService: CartService,
    private lakcimService: LakcimService,
    private rendelesService: RendelesService,
    private shoeService: ShoeService,
    private router: Router) {
    const userData = localStorage.getItem('currentUser');
    this.currentUser = userData ? JSON.parse(userData) : null;
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
        return true;
      case 3:
        return !!this.selectedPayment;
      default:
        return false;
    }
  }

  checkout() {
    this.showSuccessModal = true;
    this.cartService.clearCart();
  }
  onCloseSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(['webshop']);
}

  
}