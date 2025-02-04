import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../_services/product.service';
import { ProductService } from '../../_services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebshopnavbarComponent } from '../webshopnavbar/webshopnavbar.component';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, FormsModule, WebshopnavbarComponent],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  selectedSize: string = '';
  minPrice: number = 0;
  maxPrice: number = 200000; // vagy bármilyen magas érték, pl. 200000

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filters: any = {
        brand: params['brand'],
        model: params['model'],
        category: params['category'],
        maxPrice: params['maxPrice'] // 🛠️ Max ár figyelembe vétele
      };
  
      this.products = this.productService.getFilteredProducts(filters);
      this.applyFilters();
    });
  }
  
  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSize = !this.selectedSize || product.sizes.includes(+this.selectedSize);
      const matchesPrice = product.price >= this.minPrice && product.price <= this.maxPrice;
      return matchesSize && matchesPrice;
    });
  }
  getTitle(): string {
    return (
      this.route.snapshot.queryParams['brand'] ||
      this.route.snapshot.queryParams['model'] ||
      this.route.snapshot.queryParams['category'] ||
      'Összes termék'
    );
  }
}
