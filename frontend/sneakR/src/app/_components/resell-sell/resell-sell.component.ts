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

  showSuccessModal: boolean = false;
  selectedFiles: File[] = [];
  imageError: boolean = false;
  showValidationError: boolean = false;
  missingFields: string[] = [];
  
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFiles = Array.from(input.files);
      this.imageError = false;
    } else {
      this.selectedFiles = [];
    }
  }

  onCancel(): void {
    this.router.navigate(['/resell']);
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || this.selectedFiles.length === 0) {
      form.control.markAllAsTouched();
      this.imageError = this.selectedFiles.length === 0;
      return;
    }
    
    this.showSuccessModal = true;
  }



  onCloseSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/resell']);
  }
}
