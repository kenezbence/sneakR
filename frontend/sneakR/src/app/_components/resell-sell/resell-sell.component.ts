import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resell-sell',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './resell-sell.component.html',
  styleUrls: ['./resell-sell.component.css']
})
export class ResellSellComponent {
  constructor(private router: Router) {}

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      console.log(`${input.files.length} kép kiválasztva.`);
    }
  }

  onCancel(): void {
    // Mégse gomb navigáció az előző oldalra
    this.router.navigate(['/resell']);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    alert('Sikeres feltöltés!');
    // Itt jöhet az API hívás vagy további logika
  }
}
