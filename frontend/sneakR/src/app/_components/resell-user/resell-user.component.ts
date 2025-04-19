import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ResellProductService } from '../../_services/resell-product.service';
import { ResellCartService } from '../../_services/resell-cart.service';
import { ShoeService } from '../../_services/shoe.service';
import { RendelesService } from '../../_services/rendeles.service';
import { LakcimService } from '../../_services/lakcim.service';

@Component({
  selector: 'app-resell-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './resell-user.component.html',
  styleUrls: ['./resell-user.component.css']
})
export class ResellUserComponent implements OnInit {  
  @ViewChild('currentListings') currentListings!: ElementRef;
  @ViewChild('pastListings') pastListingsElement!: ElementRef;
  @ViewChild('purchasedItems') purchasedItems!: ElementRef;

  user: any = {
    nev: 'Felhasználó',
    email: '',
    activeListingsCount: 2
  };

  userShoes: any[] = [];
  purchasedShoes: any[] = [];
  orders: any[] = [];
  menuOpen: boolean = false;
  itemsPerView = 2;
  currentSlide = 0;
  selectedOrderDetails: any[] = [];
  showOrderModal = false;
  showDeleteConfirmation = false;
  selectedShoeId: number | null = null;
  pastListingsData: any[] = [];

  constructor(
    private router: Router,
    private resellService: ResellProductService,
    private cartService: ResellCartService,
    private shoeService: ShoeService,
    private rendelesService: RendelesService,
    private lakcimService: LakcimService 
  ) {}



  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
      this.loadUserShoes();
      this.loadPurchasedShoes(); // Add this call
    } else {
      this.router.navigate(['/login']);
    }
  }

  deleteListing(shoeId: number, event: Event): void {
    event.preventDefault();
    this.selectedShoeId = shoeId;
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    if (this.selectedShoeId) {
      this.resellService.deleteResellShoe(this.selectedShoeId).subscribe({
        next: () => {
          this.userShoes = this.userShoes.filter(shoe => shoe.id !== this.selectedShoeId);
          this.loadUserShoes(); // Refresh the list
          this.showDeleteConfirmation = false;
          this.selectedShoeId = null;
        },
        error: (err) => {
          console.error('Error deleting shoe:', err);
          this.showDeleteConfirmation = false;
          this.selectedShoeId = null;
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.selectedShoeId = null;
  }

  showOrderDetails() {
  this.rendelesService.getAllRendeles().subscribe({
    next: (res: any) => {
      const allOrders = res.Rendelesek || [];
      this.lakcimService.getAllLakcim().subscribe({
        next: (addressRes: any) => {
          const allAddresses = addressRes.Lakcimek || [];
          this.processOrderData(allOrders, allAddresses);
          this.showOrderModal = true;
        },
        error: (err) => console.error('Error loading addresses:', err)
      });
    },
    error: (err) => console.error('Error loading orders:', err)
  });
}

private processOrderData(orders: any[], addresses: any[]) {
  this.selectedOrderDetails = orders
    .filter(order => order.user_id === this.user.id)
    .map(order => ({
      ...order,
      address: addresses.find(addr => addr.id === order.szallitasiCimId)
    }));
}

closeOrderDetails() {
  this.showOrderModal = false;
  this.selectedOrderDetails = [];
}

  private loadUserShoes() {
  this.resellService.getResellShoes().subscribe({
    next: (response) => {
      const allShoes = response.ResellShoes;
      
      this.userShoes = allShoes.filter((shoe: any) => 
        shoe.user_id === this.user.id && shoe.isBought === "nem"
      );
      
      this.pastListingsData = allShoes.filter((shoe: any) => 
        shoe.user_id === this.user.id && shoe.isBought === "igen"
      );

      this.user.activeListingsCount = this.userShoes.length;
      this.user.soldItemsCount = this.pastListingsData.length; // Update count
    }
  });
}

private loadPurchasedShoes() {
  this.resellService.getResellShoes().subscribe({
    next: (resellResponse) => {
      const resellShoes = resellResponse.ResellShoes.filter((shoe: any) => 
        shoe.buyerId === this.user.id
      ).map(shoe => ({
        ...shoe,
        // Get date from localStorage or use current date
        purchaseDate: localStorage.getItem(`purchaseDate_${shoe.id}`) || new Date().toISOString(),
        type: 'resell'
      }));

      this.shoeService.getAllShoesData().subscribe({
        next: (normalShoes: any[]) => {
          const normalPurchases = normalShoes.filter(shoe => 
            shoe.userId === this.user.id
          ).map(shoe => ({
            ...shoe,
            purchaseDate: new Date().toISOString(), // Add default date
            type: 'normal'
          }));

          this.purchasedShoes = [...resellShoes, ...normalPurchases];
        }
      });
    }
  });
}

  // Remove or update the getOrderDate method since orders aren't used
  /*
  getOrderDate(shoe: any): string {
    const order = this.orders.find(o => o.user_id === this.user.id);
    return order ? new Date(order.rendeles_datum).toLocaleDateString() : 'Ismeretlen dátum';
  }
  */

  // deleteListing(shoeId: number, event: Event): void {
  //   const button = event.target as HTMLElement;
  //   const card = button.closest('.card');
    
  //   this.userShoes = this.userShoes.filter(shoe => shoe.id !== shoeId);
    
  //   if (card) {
  //     card.classList.add('fade-out');
  //     setTimeout(() => card.remove(), 300);
  //   }
  // }

  // Slider methods
  get slides(): any[][] {
    const slides = [];
    for (let i = 0; i < this.userShoes.length; i += this.itemsPerView) {
      slides.push(this.userShoes.slice(i, i + this.itemsPerView));
    }
    return slides;
  }

  get maxSlides(): number {
    return this.slides.length - 1;
  }

  prevSlide() {
    this.currentSlide = Math.max(0, this.currentSlide - 1);
  }

  nextSlide() {
    this.currentSlide = Math.min(this.maxSlides, this.currentSlide + 1);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scroll(target: HTMLElement): void {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}