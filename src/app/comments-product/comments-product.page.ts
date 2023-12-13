import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-comments-product',
  templateUrl: './comments-product.page.html',
  styleUrls: ['./comments-product.page.scss'],
})
export class CommentsProductPage  {

  public products: Product[] = [];
  public approvedProducts: Product[] = [];

  public comment: string="";
  public stars: number=1;
  movie: any;
  constructor(private userService: UserService, private router: Router, private toastController: ToastController, private productService: ProductService) { 

    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      //this.approvedProducts = products.filter(product => product.aproved);
    });
    
  }


}
