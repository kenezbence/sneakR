import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ResellCartService } from '../../_services/resell-cart.service';

interface Product {
    id: number;
    name: string;
    brand: string;
    gender: string;
    size: number;
    price: number;
    imgUrl: string;
    seller: string;
    sellerAvatar: string;
    condition: string;
}

@Component({
    selector: 'app-resell-products',
    standalone: true,
    imports: [NavbarComponent, FormsModule, CommonModule],
    templateUrl: './resell-products.component.html',
    styleUrls: ['./resell-products.component.css']
})
export class ResellProductsComponent implements OnInit {
    constructor(private cartService: ResellCartService, private route: ActivatedRoute) {}

    products: Product[] = [
        { 
            id: 1, 
            name: 'Nike Air Max 90', 
            brand: 'Nike', 
            gender: 'Férfi', 
            size: 42, 
            price: 45000, 
            imgUrl: 'https://static.nike.com/a/images/w_1280,q_auto,f_auto/oplmjxfkyp4stfe8rab8/nike-air-max-901-white-university-red-release-date.jpg', 
            seller: 'Kovács Péter', 
            sellerAvatar: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg', 
            condition: 'Használt' 
        },
        { 
            id: 2, 
            name: 'Adidas Ultraboost', 
            brand: 'Adidas', 
            gender: 'Női', 
            size: 39, 
            price: 40000, 
            imgUrl: 'https://static.ftshp.digital/img/p/1/0/0/0/3/5/4/1000354-full_product.jpg', 
            seller: 'Nagy László', 
            sellerAvatar: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg', 
            condition: 'Újszerű' 
        },
        { 
            id: 3, 
            name: 'Puma RS-X', 
            brand: 'Puma', 
            gender: 'Férfi', 
            size: 44, 
            price: 38000, 
            imgUrl: 'https://www.buzzsneakers.hu/files/thumbs/files/images/slike_proizvoda/media/395/395936-02/images/thumbs_800/395936-02_800_800px.jpg', 
            seller: 'Szabó Anna', 
            sellerAvatar: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg', 
            condition: 'Új' 
        },
        { 
            id: 4, 
            name: 'Yeezy Boost 350', 
            brand: 'Adidas', 
            gender: 'Férfi', 
            size: 43, 
            price: 150000, 
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Ge1HPavf_LACEuj5DKBFfrSQAPZP09-jzw&s', 
            seller: 'Tóth Bence', 
            sellerAvatar: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg', 
            condition: 'Új' 
        }
    ];

    filteredProducts: Product[] = [];
    brands: string[] = ['Nike', 'Adidas', 'Puma'];
    sizes: number[] = [38, 39, 40, 41, 42, 43, 44, 45];
    selectedBrand: string = '';
    selectedGender: string = '';
    selectedCondition: string = ''; 
    selectedSize: number | null = null;
    maxPrice: number = 200000; 

    ngOnInit() {
        this.filteredProducts = [...this.products];

        // Figyeljük az URL paramétereket, és alkalmazzuk a szűrést
        this.route.queryParams.subscribe(params => {
            this.selectedBrand = params['brand'] || '';
            this.selectedGender = params['gender'] || '';
            this.selectedCondition = params['condition'] || '';
            this.selectedSize = params['size'] ? Number(params['size']) : null;
            this.maxPrice = params['maxPrice'] ? Number(params['maxPrice']) : 200000;
            this.applyFilters();
        });
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product =>
            (this.selectedBrand ? product.brand === this.selectedBrand : true) &&
            (this.selectedGender ? product.gender === this.selectedGender : true) &&
            (this.selectedCondition ? product.condition === this.selectedCondition : true) &&
            (this.selectedSize ? product.size === Number(this.selectedSize) : true) &&
            (product.price <= this.maxPrice) 
        );
    }

    resetFilters() {
        this.selectedBrand = '';
        this.selectedGender = '';
        this.selectedCondition = '';
        this.selectedSize = null;
        this.maxPrice = 200000; 
        this.filteredProducts = [...this.products];
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
        console.log(`${product.name} hozzáadva a kosárhoz.`);
    }
}
