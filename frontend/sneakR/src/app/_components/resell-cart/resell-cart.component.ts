import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CartItem {
  name: string;
  img: string;
}

@Component({
  selector: 'app-resell-cart',
  standalone: true,
  imports: [
    NavbarComponent, 
    RouterLink, 
    RouterOutlet,
    CommonModule 
  ],
  templateUrl: './resell-cart.component.html',
  styleUrl: './resell-cart.component.css'
})
export class ResellCartComponent {
  cart: CartItem[] = [
    
    { 
      name: 'Nike Air Jordan', 
      img: 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a73e4b7f-9c0a-47b2-a6ef-ceb4ca6b54c3/AIR+JORDAN+1+MID+(GS).png' 
    },
    
    { 
      name: 'Adidas Superstar', 
      img: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/ID4/ID4655/images/ID4655.jpg' 
    }
    
  ];

  showCard = false;
  isMenuActive = false;

  removeItem(index: number): void {
    this.cart = this.cart.filter((_, i) => i !== index);
  }

  showCardDetails(paymentMethod: string): void {
    this.showCard = paymentMethod === 'bankkártya';
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  submitCheckout(event: Event, name: string, email: string, address: string): void {
    event.preventDefault();
    alert(`Kosarad elküldve!\nNév: ${name}\nEmail: ${email}\nCím: ${address}`);
  }
}