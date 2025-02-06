// cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  addToCart(product: Product) {
    this.items.push(product);
  }

  removeFromCart(index: number) {
    this.items.splice(index, 1);
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }

  clearCart() {
    this.items = [];
  }
}