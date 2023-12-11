import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage {
  public products: Product[] = [];
  public approvedProducts: Product[] = [];

  constructor( private productService: ProductService) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.approvedProducts = products.filter(product => product.aproved);
    });

  }

}
