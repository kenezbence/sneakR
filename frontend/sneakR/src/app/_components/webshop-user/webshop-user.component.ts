import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../_services/user.service';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-webshop-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './webshop-user.component.html',
  styleUrls: ['./webshop-user.component.css'],
  providers: [UserService]
})
export class WebshopUserComponent implements OnInit {
  user: User | null = null;
  orders: Order[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.orders = data.orders;
        this.loading = false;
      },
      error: () => {
        this.error = 'Nem sikerült betölteni az adatokat.';
        this.loading = false;
      }
    });
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'fas fa-clock';
      case 'shipped': return 'fas fa-truck';
      case 'delivered': return 'fas fa-check-circle';
      case 'cancelled': return 'fas fa-times-circle';
      default: return '';
    }
  }

  getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'pending';
      case 'shipped': return 'shipped';
      case 'delivered': return 'delivered';
      case 'cancelled': return 'cancelled';
      default: return '';
    }
  }
  
  
    }
  
