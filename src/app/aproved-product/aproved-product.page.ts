import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-aproved-product',
  templateUrl: './aproved-product.page.html',
  styleUrls: ['./aproved-product.page.scss'],
})
export class AprovedProductPage {
  public products: Product[] = [];
  public approvedProducts: Product[] = [];
  public unapprovedProducts: Product[] = [];

  constructor( private productService: ProductService) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.approvedProducts = products.filter(product => product.aproved);
      this.unapprovedProducts = products.filter(product => !product.aproved);
    
    });

  }
  

  async approveProduct(product: Product) {
    try {
      const result = await this.productService.approveProduct(product);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  

}
