import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ResellCartService, CartProduct } from '../../_services/resell-cart.service';

@Component({
  selector: 'app-resell-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './resell-cart.component.html',
  styleUrls: ['./resell-cart.component.css']
})
export class ResellCartComponent implements OnInit {
  cart: CartProduct[] = [];
  showCard = false;
  isMenuActive = false;

  constructor(private cartService: ResellCartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  showCardDetails(paymentMethod: string): void {
    this.showCard = paymentMethod === 'bankkártya';
  }

  submitCheckout(event: Event, name: string, email: string, city: string, zip: string, street: string, number: string): void {
    event.preventDefault();
    const address = `${street} ${number}, ${city} ${zip}`;
    alert(`Kosarad elküldve!\nNév: ${name}\nEmail: ${email}\nCím: ${address}`);
    this.cartService.clearCart();
}

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price, 0);
}

}