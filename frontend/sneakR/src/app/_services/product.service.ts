import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  brand: string;
  model?: string;
  price: number;
  sizes: number[];
  image: string;
  category?: string; // Opcionálisan megadható
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
        id: 1,
        name: 'Nike Dunk Low Retro',
        brand: 'Nike',
        model: 'Dunk',
        price: 64990,
        sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/HQ4/HQ4988-030/images/HQ4988-030.jpg'
    },
    {
        id: 2,
        name: 'Nike Dunk Low Retro',
        brand: 'Nike',
        model: 'Dunk',
        price: 47990,
        sizes: [36, 38, 40, 41, 42, 43],
        image: 'https://www.buzzsneakers.hu/files/thumbs/files/images/slike_proizvoda/media/DD1/DD1391-103/images/thumbs_800/DD1391-103_800_800px.jpg'
    },
    {
        id: 3,
        name: 'Nike Dunk High Premium',
        brand: 'Nike',
        model: 'Dunk',
        price: 69990,
        sizes: [40, 41, 42, 43, 44, 45],
        image: 'https://www.buzzsneakers.hu/files/thumbs/files/images/slike_proizvoda/media/FV5/FV5960-100/images/thumbs_800/FV5960-100_800_800px.jpg'
    },
    {
        id: 4,
        name: 'Nike Dunk Low SE',
        brand: 'Nike',
        model: 'Dunk',
        price: 59990,
        sizes: [38, 39, 40, 41, 42],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/HQ1/HQ1519-030/images/HQ1519-030.jpg'
    },
    {
        id: 5,
        name: 'Nike Dunk High Retro',
        brand: 'Nike',
        model: 'Dunk',
        price: 67990,
        sizes: [39, 40, 41, 42, 43],
        image: 'https://www.buzzsneakers.hu/files/thumbs/files/images/slike_proizvoda/media/DD1/DD1399-105/images/thumbs_800/DD1399-105_800_800px.jpg'
    },
    {
        id: 6,
        name: 'Nike Dunk Low Next Nature',
        brand: 'Nike',
        model: 'Dunk',
        price: 62990,
        sizes: [36, 37, 38, 39, 40],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/HF5/HF5384-300/images/HF5384-300.jpg'
    },
    {
        id: 7,
        name: 'Nike Dunk High 1985',
        brand: 'Nike',
        model: 'Dunk',
        price: 71990,
        sizes: [40, 41, 42, 43, 44],
        image: 'https://www.buzzsneakers.hu/files/thumbs/files/images/slike_proizvoda/media/DD1/DD1869-114/images/thumbs_800/DD1869-114_800_800px.jpg'
    },
    {
        id: 8,
        name: 'Nike Dunk Low Disrupt',
        brand: 'Nike',
        model: 'Dunk',
        price: 57990,
        sizes: [37, 38, 39, 40, 41],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/FN7/FN7167-400/images/FN7167-400.jpg'
    },
    {
        id: 9,
        name: 'Nike Dunk High Up',
        brand: 'Nike',
        model: 'Dunk',
        price: 68990,
        sizes: [39, 40, 41, 42],
        image: 'https://www.buzzsneakers.hu/files/thumbs/files/images/slike_proizvoda/media/DB2/DB2179-118/images/thumbs_800/DB2179-118_800_800px.jpg'
    },
    {
        id: 10,
        name: 'Nike Dunk Low Flyleather',
        brand: 'Nike',
        model: 'Dunk',
        price: 64990,
        sizes: [36, 37, 38, 39],
        image: 'https://www.buzzsneakers.hu/files/thumbs/files/images/slike_proizvoda/media/DX5/DX5931-100/images/thumbs_800/DX5931-100_800_800px.jpg'
    },
    {
        id: 11,
        name: 'Nike Dunk High Rebel',
        brand: 'Nike',
        model: 'Dunk',
        price: 70990,
        sizes: [40, 41, 42, 43],
        image: 'https://www.buzzsneakers.gr/files/images/slike_proizvoda/media/DH3/DH3718-100/images/DH3718-100.jpg'
    },
    {
        id: 12,
        name: 'Nike Dunk Low SP',
        brand: 'Nike',
        model: 'Dunk',
        price: 59990,
        sizes: [38, 39, 40, 41, 42, 43],
        image: 'https://www.buzzsneakers.hu/files/thumbs/files/images/slike_proizvoda/media/DD1/DD1873-600/images/thumbs_800/DD1873-600_800_800px.jpg'
    },
    {
        id: 13,
        name: 'Nike Dunk High Varsity',
        brand: 'Nike',
        model: 'Dunk',
        price: 67990,
        sizes: [39, 40, 41, 42, 43, 44],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/DD1/DD1869-202/images/DD1869-202.jpg'
    },
    {
        id: 14,
        name: 'Nike Dunk Low Premium',
        brand: 'Nike',
        model: 'Dunk',
        price: 62990,
        sizes: [36, 37, 38, 39, 40, 41],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/FB7/FB7910-500/images/FB7910-500.jpg'
    },
    {
        id: 15,
        name: 'Nike Dunk High SE',
        brand: 'Nike',
        model: 'Dunk',
        price: 69990,
        sizes: [40, 41, 42, 43, 44, 45],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/FB8/FB8892-200/images/FB8892-200.jpg'
    },
    {
        id: 16,
        name: 'Nike Dunk Low Essential',
        brand: 'Nike',
        model: 'Dunk',
        price: 58990,
        sizes: [37, 38, 39, 40, 41, 42],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/FB9/FB9109-111/images/FB9109-111.jpg'
    },
    {
        id: 17,
        name: 'Nike Dunk High LX',
        brand: 'Nike',
        model: 'Dunk',
        price: 71990,
        sizes: [39, 40, 41, 42, 43],
        image: 'https://www.buzzsneakers.hu/files/images/slike_proizvoda/media/DD1/DD1869-113/images/DD1869-113.jpg'
    },
    {
      id: 1,
      name: 'Air Jordan 1 Retro High OG',
      brand: 'Jordan',
      model: 'Air Jordan 1',
      price: 74990,
      sizes: [40, 41, 42, 43, 44],
      image: 'https://example.com/air-jordan-1-retro-high-og.jpg'
  },
  {
      id: 2,
      name: 'Air Jordan 3 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 3',
      price: 79990,
      sizes: [39, 40, 41, 42, 43, 44, 45],
      image: 'https://example.com/air-jordan-3-retro.jpg'
  },
  {
      id: 3,
      name: 'Air Jordan 4 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 4',
      price: 82990,
      sizes: [38, 39, 40, 41, 42],
      image: 'https://example.com/air-jordan-4-retro.jpg'
  },
  {
      id: 4,
      name: 'Air Jordan 5 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 5',
      price: 85990,
      sizes: [40, 41, 42, 43, 44, 45],
      image: 'https://example.com/air-jordan-5-retro.jpg'
  },
  {
      id: 5,
      name: 'Air Jordan 6 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 6',
      price: 88990,
      sizes: [39, 40, 41, 42, 43],
      image: 'https://example.com/air-jordan-6-retro.jpg'
  },
  {
      id: 6,
      name: 'Air Jordan 7 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 7',
      price: 81990,
      sizes: [38, 39, 40, 41, 42, 43, 44],
      image: 'https://example.com/air-jordan-7-retro.jpg'
  },
  {
      id: 7,
      name: 'Air Jordan 8 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 8',
      price: 84990,
      sizes: [40, 41, 42, 43, 44],
      image: 'https://example.com/air-jordan-8-retro.jpg'
  },
  {
      id: 8,
      name: 'Air Jordan 9 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 9',
      price: 87990,
      sizes: [39, 40, 41, 42, 43, 44, 45],
      image: 'https://example.com/air-jordan-9-retro.jpg'
  },
  {
      id: 9,
      name: 'Air Jordan 10 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 10',
      price: 89990,
      sizes: [38, 39, 40, 41, 42],
      image: 'https://example.com/air-jordan-10-retro.jpg'
  },
  {
      id: 10,
      name: 'Air Jordan 11 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 11',
      price: 92990,
      sizes: [40, 41, 42, 43, 44, 45],
      image: 'https://example.com/air-jordan-11-retro.jpg'
  },
  {
      id: 11,
      name: 'Air Jordan 12 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 12',
      price: 94990,
      sizes: [39, 40, 41, 42, 43],
      image: 'https://example.com/air-jordan-12-retro.jpg'
  },
  {
      id: 12,
      name: 'Air Jordan 13 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 13',
      price: 96990,
      sizes: [38, 39, 40, 41, 42, 43, 44],
      image: 'https://example.com/air-jordan-13-retro.jpg'
  },
  {
      id: 13,
      name: 'Air Jordan 14 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 14',
      price: 98990,
      sizes: [40, 41, 42, 43, 44],
      image: 'https://example.com/air-jordan-14-retro.jpg'
  },
  {
      id: 14,
      name: 'Air Jordan 15 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 15',
      price: 99990,
      sizes: [39, 40, 41, 42, 43, 44, 45],
      image: 'https://example.com/air-jordan-15-retro.jpg'
  },
  {
      id: 15,
      name: 'Air Jordan 16 Retro',
      brand: 'Jordan',
      model: 'Air Jordan 16',
      price: 102990,
      sizes: [38, 39, 40, 41, 42],
      image: 'https://example.com/air-jordan-16-retro.jpg'
  },
  {
    id: 1,
    name: 'Adidas Ultraboost 21',
    brand: 'Adidas',
    model: 'Ultraboost',
    price: 59990,
    sizes: [40, 41, 42, 43, 44],
    image: 'https://example.com/adidas-ultraboost-21.jpg'
},
{
    id: 2,
    name: 'Adidas NMD_R1',
    brand: 'Adidas',
    model: 'NMD',
    price: 54990,
    sizes: [38, 39, 40, 41, 42],
    image: 'https://example.com/adidas-nmd-r1.jpg'
},
{
    id: 3,
    name: 'Adidas Superstar',
    brand: 'Adidas',
    model: 'Superstar',
    price: 34990,
    sizes: [36, 37, 38, 39, 40],
    image: 'https://example.com/adidas-superstar.jpg'
},
// 3 Yeezy cipő
{
    id: 4,
    name: 'Yeezy Boost 350 V2',
    brand: 'Yeezy',
    model: 'Yeezy 350',
    price: 89990,
    sizes: [38, 39, 40, 41, 42],
    image: 'https://example.com/yeezy-boost-350-v2.jpg'
},
{
    id: 5,
    name: 'Yeezy Boost 700',
    brand: 'Yeezy',
    model: 'Yeezy 700',
    price: 99990,
    sizes: [40, 41, 42, 43, 44],
    image: 'https://example.com/yeezy-boost-700.jpg'
},
{
    id: 6,
    name: 'Yeezy 500',
    brand: 'Yeezy',
    model: 'Yeezy 500',
    price: 94990,
    sizes: [38, 39, 40, 41, 42],
    image: 'https://example.com/yeezy-500.jpg'
},
// 3 New Balance cipő
{
    id: 7,
    name: 'New Balance 574',
    brand: 'New Balance',
    model: 'New Balance 574',
    price: 39990,
    sizes: [40, 41, 42, 43, 44],
    image: 'https://example.com/new-balance-574.jpg'
},
{
    id: 8,
    name: 'New Balance 997H',
    brand: 'New Balance',
    model: 'New Balance 997H',
    price: 44990,
    sizes: [38, 39, 40, 41, 42],
    image: 'https://example.com/new-balance-997h.jpg'
},
{
    id: 9,
    name: 'New Balance 327',
    brand: 'New Balance',
    model: 'New Balance 327',
    price: 42990,
    sizes: [36, 37, 38, 39, 40],
    image: 'https://example.com/new-balance-327.jpg'
},
// 3 Alexander McQueen cipő
{
    id: 10,
    name: 'Alexander McQueen Oversized Sneaker',
    brand: 'Alexander McQueen',
    model: 'Oversized',
    price: 149990,
    sizes: [40, 41, 42, 43, 44],
    image: 'https://example.com/alexander-mcqueen-oversized.jpg'
},
{
    id: 11,
    name: 'Alexander McQueen Tread Slick',
    brand: 'Alexander McQueen',
    model: 'Tread Slick',
    price: 159990,
    sizes: [38, 39, 40, 41, 42],
    image: 'https://example.com/alexander-mcqueen-tread-slick.jpg'
},
{
    id: 12,
    name: 'Alexander McQueen Court Trainer',
    brand: 'Alexander McQueen',
    model: 'Court Trainer',
    price: 139990,
    sizes: [36, 37, 38, 39, 40],
    image: 'https://example.com/alexander-mcqueen-court-trainer.jpg'
},
// 3 Nike Travis Scott cipő
{
    id: 13,
    name: 'Nike Air Force 1 Low Travis Scott',
    brand: 'Travis Scott',
    model: 'Air Force 1',
    price: 109990,
    sizes: [40, 41, 42, 43, 44],
    image: 'https://example.com/nike-af1-travis-scott.jpg'
},
{
    id: 14,
    name: 'Nike SB Dunk Low Travis Scott',
    brand: 'Travis Scott',
    model: 'Dunk',
    price: 119990,
    sizes: [38, 39, 40, 41, 42],
    image: 'https://balazskicks.com/cdn/shop/products/image_43a8c756-8bc2-4205-a8ee-012e60dbd9af.png?v=1702321194&width=2048'
},
{
    id: 15,
    name: 'Nike Air Max 270 React Travis Scott',
    brand: 'Travis Scott',
    model: 'Air Max',
    price: 99990,
    sizes: [36, 37, 38, 39, 40],
    image: 'https://example.com/nike-am270-travis-scott.jpg'
},
// 3 Reebok cipő
{
    id: 16,
    name: 'Reebok Club C 85',
    brand: 'Reebok',
    model: 'Reebok Club C 85',
    price: 34990,
    sizes: [40, 41, 42, 43, 44],
    image: 'https://example.com/reebok-club-c-85.jpg'
},
{
    id: 17,
    name: 'Reebok Classic Leather',
    brand: 'Reebok',
    model: 'Reebok Classic Leather',
    price: 37990,
    sizes: [38, 39, 40, 41, 42],
    image: 'https://example.com/reebok-classic-leather.jpg'
},

{
  id: 18,
  name: 'Reebok Aztrek 96',
  brand: 'Reebok',
  model: 'Reebok Aztrek 96',
  price: 39990,
  sizes: [36, 37, 38, 39, 40],
  image: 'https://example.com/reebok-aztrek-96.jpg'
},
// 3 Converse cipő
{
  id: 19,
  name: 'Converse Chuck Taylor All Star High Top',
  brand: 'Converse',
  model: 'Converse Chuck Taylor All Star',
  price: 29990,
  sizes: [40, 41, 42, 43, 44],
  image: 'https://example.com/converse-chuck-taylor-high.jpg'
},
{
  id: 21,
  name: 'Converse One Star Pro',
  brand: 'Converse',
  model: 'Converse One Star',
  price: 31990,
  sizes: [36, 37, 38, 39, 40],
  image: 'https://example.com/converse-one-star-pro.jpg'
},
// 3 Puma cipő
{
  id: 22,
  name: 'Puma Suede Classic',
  brand: 'Puma',
  model: 'Puma Suede Classic',
  price: 34990,
  sizes: [40, 41, 42, 43, 44],
  image: 'https://example.com/puma-suede-classic.jpg'
},
{
  id: 23,
  name: 'Puma RS-X3',
  brand: 'Puma',
  model: 'Puma RS-X3',
  price: 39990,
  sizes: [38, 39, 40, 41, 42],
  image: 'https://example.com/puma-rs-x3.jpg'
},
{
  id: 24,
  name: 'Puma Cali',
  brand: 'Puma',
  model: 'Puma Cali',
  price: 37990,
  sizes: [36, 37, 38, 39, 40],
  image: 'https://example.com/puma-cali.jpg'
},
{
  id: 25,
  name: 'Sneaker Doctor Shoe Shields Cipőorr védő készlet',
  brand: 'Sneaker Doctor',
  model: 'Shoe Shields',
  category: 'Shield',
  price: 2990,
  sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  image: 'https://example.com/sneaker-doctor-shoe-shields.jpg'
},
{
  id: 26,
  name: 'Crep Protect Sneaker Shields',
  brand: 'Crep Protect',
  model: 'Sneaker Shields',
  category: 'Shield',
  price: 3490,
  sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  image: 'https://example.com/crep-protect-sneaker-shields.jpg'
},
{
  id: 27,
  name: 'ForceField Crease Preventers',
  brand: 'ForceField',
  model: 'Crease Preventers',
  category: 'Shield',
  price: 3190,
  sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  image: 'https://example.com/forcefield-crease-preventers.jpg'
},

// Cipőfűzők
{
  id: 28,
  name: 'Premium Kerek Cipőfűző',
  brand: 'Lace Lab',
  model: 'Round Laces',
  category: 'Lace',
  price: 1290,
  sizes: [],
  image: 'https://example.com/lace-lab-round-laces.jpg'
},
{
  id: 29,
  name: 'Széles Lapos Cipőfűző',
  brand: 'Sneakerhead',
  model: 'Wide Flat Laces',
  category: 'Lace',
  price: 1490,
  sizes: [],
  image: 'https://example.com/sneakerhead-wide-flat-laces.jpg'
},
{
  id: 30,
  name: 'Fényvisszaverő Cipőfűző',
  brand: 'Reflective',
  model: 'Reflective Laces',
  category: 'Lace',
  price: 1990,
  sizes: [],
  image: 'https://example.com/reflective-laces.jpg'
},

// Cipőápolási termékek
{
  id: 31,
  name: 'Jason Markk Premium Shoe Cleaner',
  brand: 'Jason Markk',
  model: 'Shoe Cleaner',
  category: 'Care',
  price: 5490,
  sizes: [],
  image: 'https://example.com/jason-markk-shoe-cleaner.jpg'
},
{
  id: 32,
  name: 'Crep Protect Spray',
  brand: 'Crep Protect',
  model: 'Protect Spray',
  category: 'Care',
  price: 4990,
  sizes: [],
  image: 'https://example.com/crep-protect-spray.jpg'
},
{
  id: 33,
  name: 'Reshoevn8r Sneaker Wipes',
  brand: 'Reshoevn8r',
  model: 'Sneaker Wipes',
  category: 'Care',
  price: 2990,
  sizes: [],
  image: 'https://example.com/reshoevn8r-sneaker-wipes.jpg'
},

// Ajándékutalványok
{
  id: 34,
  name: '10 000 Ft Ajándékutalvány',
  brand: 'Store',
  model: 'Gift Card',
  category: 'Gift',
  price: 10000,
  sizes: [],
  image: 'https://example.com/gift-card-10000.jpg'
},
{
  id: 35,
  name: '25 000 Ft Ajándékutalvány',
  brand: 'Store',
  model: 'Gift Card',
  category: 'Gift',
  price: 25000,
  sizes: [],
  image: 'https://example.com/gift-card-25000.jpg'
},
{
  id: 36,
  name: '50 000 Ft Ajándékutalvány',
  brand: 'Store',
  model: 'Gift Card',
  category: 'Gift',
  price: 50000,
  sizes: [],
  image: 'https://example.com/gift-card-50000.jpg'
}

];

getFilteredProducts(filters: any): Product[] {
  return this.products.filter(product => {
    let match = true;
    
    if (filters.brand) match = match && product.brand === filters.brand;
    if (filters.model) match = match && product.model === filters.model;
    if (filters.category) match = match && product.category === filters.category;
    if (filters.maxPrice) match = match && product.price <= +filters.maxPrice; // Árszűrés

    return match;
  });
}
}