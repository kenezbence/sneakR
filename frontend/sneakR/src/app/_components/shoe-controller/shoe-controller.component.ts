// shoe-controller.component.ts
import { Component } from '@angular/core';
import { ShoeService } from '../../_services/shoe.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shoe-controller',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './shoe-controller.component.html',
  styleUrls: ['./shoe-controller.component.css']
})
export class ShoeControllerComponent {
  shoes: any[] = [];
  isAdmin: boolean = false;
  currentUser: any;

  showConfirmModal: boolean = false;
  showSuccessModal: boolean = false;
  selectedShoeId: number | null = null;
  selectedShoeName: string = '';
  showUploadModal: boolean = false;
  showUploadSuccessModal: boolean = false;
  showUploadErrorModal: boolean = false;
  uploadImageUrl = '';

  constructor(private shoeService: ShoeService, private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isAdmin = this.currentUser.admin === 'igen';
      
      if (this.isAdmin) {
        this.loadShoes();
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadShoes() {
    this.shoeService.getAllShoesData().subscribe({
      next: (response: any) => {
        this.shoes = response.shoes;
      },
      error: (err) => console.error('Error loading shoes:', err)
    });
  }

  
  openUploadModal() {
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
  }
  onUploadSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const postData = {
      nev: form.value.nev,
      marka: form.value.marka,
      nem: form.value.nem,
      allapot: form.value.allapot,
      meret: Number(form.value.meret),
      ar: Number(form.value.ar),
      img: form.value.img
    };

    this.shoeService.uploadShoe(postData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.showUploadModal = false;
          this.showUploadSuccessModal = true;
          this.loadShoes();
          form.resetForm();
        }
      },
      error: (err) => {
        console.error('Hiba a feltöltés során:', err);
        alert('Hiba történt a feltöltés során!');
      }
    });
  }
  deleteShoe(shoe: any) {
    this.selectedShoeId = shoe.id;
    this.selectedShoeName = shoe.nev;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.selectedShoeId) {
      this.shoeService.deleteShoe(this.selectedShoeId).subscribe({
        next: () => {
          this.shoes = this.shoes.filter(shoe => shoe.id !== this.selectedShoeId);
          this.showConfirmModal = false;
          this.showSuccessModal = true;
        },
        error: (err) => {
          console.error('Error deleting shoe:', err);
          this.resetSelection();
        }
      });
    }
  }
  onCloseUploadSuccessModal() {
    this.showUploadSuccessModal = false;
  }

  cancelDelete() {
    this.resetSelection();
  }

  onCloseSuccessModal(): void {
    this.resetSelection();
  }
  private resetSelection() {
    this.showConfirmModal = false;
    this.showSuccessModal = false;
    this.selectedShoeId = null;
    this.selectedShoeName = '';
  }
  goBackToProfile() {
    this.router.navigate(['/resell-user']);
  }

  goBack() {
    this.router.navigate(['/select']);
  }


  
}