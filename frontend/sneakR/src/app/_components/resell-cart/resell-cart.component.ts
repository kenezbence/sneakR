import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-resell-cart',
  standalone: true,
  imports: [NavbarComponent,RouterLink,RouterOutlet],
  templateUrl: './resell-cart.component.html',
  styleUrl: './resell-cart.component.css'
})
export class ResellCartComponent {
  
}
