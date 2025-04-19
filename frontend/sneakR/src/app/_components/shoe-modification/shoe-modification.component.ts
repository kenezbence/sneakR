import { Component } from '@angular/core';
import { ShoeService } from '../../_services/shoe.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shoe-modification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shoe-modification.component.html',
  styleUrls: ['./shoe-modification.component.css']
})
export class ShoeModificationComponent {
  editingShoe: any;
  brands = [
    'Nike', 'Adidas', 'Puma', 'Reebok', 'Converse', 
    'Jordan', 'Yeezy', 'New Balance', 'Alexander McQueen', 'Travis Scott'
  ];

  constructor(
    private shoeService: ShoeService,
    private router: Router
  ) {
    // Get the shoe data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.editingShoe = {...navigation.extras.state['shoe']};
    } else {
      // Redirect back if no data
      this.router.navigate(['/shoe-controller']);
    }
  }

  onEditSubmit(form: NgForm) {
    if (form.invalid) return;

    this.shoeService.updateShoe(this.editingShoe.id, this.editingShoe).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.router.navigate(['/shoe-controller']);
        }
      },
      error: (err) => console.error('Update error:', err)
    });
  }

  goBack() {
    this.router.navigate(['/shoe-controller']);
  }
}