import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isFormValid: boolean = false;

  constructor(private router: Router) {}

  checkInputs(): void {
    const email = (document.getElementById('email') as HTMLInputElement)?.value.trim();
    const password = (document.getElementById('password') as HTMLInputElement)?.value.trim();
    const lastName = (document.getElementById('lastName') as HTMLInputElement)?.value.trim();
    const firstName = (document.getElementById('firstName') as HTMLInputElement)?.value.trim();

    // Ellenőrizzük, hogy minden mező valid-e
    this.isFormValid = !!(email && password && lastName && firstName && password.length >= 6);
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Form alapértelmezett működésének megakadályozása
    alert('Sikeres regisztráció! Üdvözlünk a SneakR közösségben.');
    this.router.navigate(['/login']); // Átirányítás a login komponensre
  }
}
