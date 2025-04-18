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
  showSuccessModal = true;
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
    if (this.currentStep === 2) {
      const lakcimData = {
        userId: this.currentUser.id,
        telefonszam: this.shippingForm.phone,
        varos: this.shippingForm.city,
        iranyitoszam: this.shippingForm.postalCode,
        utcaHazszam: this.shippingForm.street
      };

      this.lakcimService.insertLakcim(lakcimData).subscribe({
        next: () => {
          this.lakcimService.getAllLakcim().subscribe({
            next: (res: any) => {
              const addresses = res.Lakcimek.filter((a: any) => a.user_id === this.currentUser.id);
              if (addresses.length > 0) {
                addresses.sort((a: any, b: any) => b.id - a.id);
                this.szallitasiCimId = addresses[0].id;
                this.currentStep++;
              }
            }
          });
        }
      });
    } else {
      this.currentStep++;
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
    if (!this.szallitasiCimId) return;

    const orderData = {
      userId: this.currentUser.id,
      szallitasiCimId: this.szallitasiCimId,
      osszeg: this.cartService.getTotal() + this.shippingCost,
      rendelesAllapot: "Előkészítés"
    };

    this.rendelesService.insertRendeles(orderData).subscribe({
      next: () => {
        this.cartItems.forEach(item => {
          this.shoeService.updateShoeBuyer(item.id, this.currentUser.id).subscribe();
        });
        this.cartService.clearCart();
        this.showSuccessModal = true;
      }
    });
  }
  onCloseSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(['webshop']);
}

  
}