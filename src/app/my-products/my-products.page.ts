import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {
  public products: Product[] = [];
  public myproducts: Product[] = [];
  public email: string = "";

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private alertController: AlertController
  ) { 
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.myproducts = products.filter(product => product.salesman === this.email && product.aproved);
    });
  }

  async deleteProduct(product: Product) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: `¿Esta seguro de que quieres eliminar el producto ${product.name} ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async() => {
             await this.productService.deleteProduct(product);
           
          },
        },
      ],
    });
  
    await alert.present();
  }

  ngOnInit() {
    this.userService.userEmail$.subscribe((email) => {
      // Aquí obtienes el email del usuario y puedes hacer lo que necesites con él
      this.email = email;
    });
  }

}
