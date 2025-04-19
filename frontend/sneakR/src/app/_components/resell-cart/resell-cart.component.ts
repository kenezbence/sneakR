import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ResellCartService, CartProduct } from '../../_services/resell-cart.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LakcimService } from '../../_services/lakcim.service';
import { RendelesService } from '../../_services/rendeles.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-resell-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './resell-cart.component.html',
  styleUrls: ['./resell-cart.component.css']
})
export class ResellCartComponent implements OnInit {
  cart: CartProduct[] = [];
  currentStep = 1;
  showSuccessModal = false;
  selectedPayment: string = 'készpénz';
  currentUser: any;
  szallitasiCimId: number | null = null;

  shippingForm = {
    name: '',
    email: '',
    city: '',
    zip: '',
    street: '',
    phone: ''
  };

  constructor(
    private cartService: ResellCartService,
    private router: Router,
    private lakcimService: LakcimService,
    private rendelesService: RendelesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    this.currentUser = userData ? JSON.parse(userData) : null;
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  nextStep() {
    if (this.currentStep === 2) {
      this.saveAddressAndProceed();
    } else {
      this.currentStep++;
    }
  }

  previousStep() {
    this.currentStep--;
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1: return this.cart.length > 0;
      case 2: return this.isShippingFormValid();
      case 3: return !!this.selectedPayment;
      default: return false;
    }
  }

  handleStepAction() {
    if (this.currentStep === 3) {
      this.submitOrder();
    } else {
      this.nextStep();
    }
  }

  private isShippingFormValid(): boolean {
    return !!this.shippingForm.name && !!this.shippingForm.email &&
           !!this.shippingForm.city && !!this.shippingForm.zip &&
           !!this.shippingForm.street;
  }

  private saveAddressAndProceed() {
    const addressData = {
      userId: this.currentUser.id,
      varos: this.shippingForm.city,
      iranyitoszam: this.shippingForm.zip,
      utcaHazszam: this.shippingForm.street,
      telefonszam: this.shippingForm.phone
    };

    this.lakcimService.insertLakcim(addressData).subscribe({
      next: () => {
        this.lakcimService.getAllLakcim().subscribe({
          next: (res: any) => {
            const addresses = res.Lakcimek.filter((a: any) => a.user_id === this.currentUser.id);
            if (addresses.length > 0) {
              this.szallitasiCimId = addresses[addresses.length - 1].id;
              this.currentStep++;
            }
          }
        });
      },
      error: (err) => console.error('Error saving address:', err)
    });
  }

  private submitOrder() {
    if (!this.szallitasiCimId) return;

    const orderData = {
      userId: this.currentUser.id,
      szallitasiCimId: this.szallitasiCimId,
      osszeg: this.getTotal(),
      rendelesAllapot: "Feldolgozás alatt"
    };

    this.rendelesService.insertRendeles(orderData).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.showSuccessModal = true;
      },
      error: (err) => console.error('Error submitting order:', err)
    });
  }

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price, 0);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onCloseSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/resell']);
  }
}