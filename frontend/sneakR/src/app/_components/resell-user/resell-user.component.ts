import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-resell-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './resell-user.component.html',
  styleUrls: ['./resell-user.component.css']
})
export class ResellUserComponent {
  @ViewChild('currentListings') currentListings!: ElementRef;
  @ViewChild('pastListings') pastListings!: ElementRef;
  @ViewChild('purchasedItems') purchasedItems!: ElementRef;

    activeListingsCount: number = 2; // Számláló változó
  
    deleteListing(event: Event): void {
      const button = event.target as HTMLElement;
      const card = button.closest('.card');
      if (card) {
        card.classList.add('fade-out');
        setTimeout(() => {
          card.remove();
          this.activeListingsCount--; // Számláló csökkentése
        }, 300);
      }
    }
  

  scroll(target: HTMLElement): void {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}