import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-resell-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './resell-user.component.html',
  styleUrls: ['./resell-user.component.css']
})
export class ResellUserComponent implements OnInit  {
  
  @ViewChild('currentListings') currentListings!: ElementRef;
  @ViewChild('pastListings') pastListings!: ElementRef;
  @ViewChild('purchasedItems') purchasedItems!: ElementRef;

  user: any = {
    nev: 'Felhasználó',
    email: '',
    activeListingsCount: 2
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user.activeListingsCount = 2; 
    } else {
      this.router.navigate(['/login']);
    }
  }

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