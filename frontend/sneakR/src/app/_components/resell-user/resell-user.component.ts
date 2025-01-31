import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-resell-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './resell-user.component.html',
  styleUrl: './resell-user.component.css'
})
export class ResellUserComponent {
  deleteListing(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const card = button.closest('.card');
    if (card) {
      card.remove();
      alert('A hirdetés törölve lett!');
    }
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
}
