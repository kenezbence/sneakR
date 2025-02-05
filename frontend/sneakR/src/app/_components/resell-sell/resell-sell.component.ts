import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resell-sell',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './resell-sell.component.html',
  styleUrls: ['./resell-sell.component.css']
})
export class ResellSellComponent {
  constructor(private router: Router) {}

  sizes = Array.from({length: 10}, (_, i) => i + 36); // 36-45-ig generálja a méreteket
  brands = ['Nike', 'Adidas', 'Puma', 'Reebook', 'Converse', 'Jordan', 'Yeezy', 'New Balance', 'Alexander McQueen', 'Travis Scott'];
  conditions = ['Új', 'Használt'];
  genders = ['Férfi', 'Női'];

  showSuccessModal: boolean = false;
  showLinkModal: boolean = false;
  imageUrl: string = '';
  imageError: boolean = false;
  
  openLinkModal(): void {
    this.showLinkModal = true;
    
  }

  closeLinkModal(): void {
    this.showLinkModal = false;
  }

  confirmImage(): void {
    if(this.imageUrl) {
      this.imageError = false;
      this.closeLinkModal();
    }
  }

  onCancel(): void {
    this.router.navigate(['/resell']);
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.imageUrl) {
        form.control.markAllAsTouched();
        this.imageError = !this.imageUrl;
        return;
    }
    this.showSuccessModal = true;
    
  }

  

  onCloseSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/resell']);
  }
}

