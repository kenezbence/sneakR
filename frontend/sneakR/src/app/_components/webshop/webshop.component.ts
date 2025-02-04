  import { Component } from '@angular/core';
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
  }