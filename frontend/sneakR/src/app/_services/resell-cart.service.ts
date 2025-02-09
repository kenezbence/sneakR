import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartProduct {
    id: number;
    name: string;
    brand: string;
    price: number;
    imgUrl: string;
    seller: string;
    sellerAvatar: string;
    condition: string;
    size: number;
}

@Injectable({
    providedIn: 'root'
})
export class ResellCartService {
    private cart: CartProduct[] = [];
    private cartSubject = new BehaviorSubject<CartProduct[]>([]);

    getCart() {
        return this.cartSubject.asObservable();
    }

    addToCart(product: CartProduct) {
        this.cart.push(product);
        this.cartSubject.next([...this.cart]); // Frissítés az observerben
    }

    removeFromCart(productId: number) {
        this.cart = this.cart.filter(p => p.id !== productId);
        this.cartSubject.next([...this.cart]); // Frissítés az observerben
    }

    clearCart() {
        this.cart = [];
        this.cartSubject.next([]);
    }
}
