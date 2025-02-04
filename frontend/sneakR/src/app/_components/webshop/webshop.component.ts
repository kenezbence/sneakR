import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-webshop',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './webshop.component.html',
  styleUrl: './webshop.component.css'
})
export class WebshopComponent {
  isMenuOpen = false;
  menuState: { [key: string]: boolean } = {};

  @ViewChild('best') bestSection!: ElementRef; // Best Sellerek szekció referencia

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      this.menuState = {}; // Reset submenü állapotok
    }
  }

  toggleSubmenu(menuKey: string) {
    this.menuState[menuKey] = !this.menuState[menuKey];
  }

  scrollToBest() {
    if (this.bestSection) {
      this.bestSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
