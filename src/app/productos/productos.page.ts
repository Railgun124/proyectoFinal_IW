import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage {
  public products: Product[] = [];
  public approvedProducts: Product[] = [];

  isAuthenticated = false;
  user: any;
  isAdmin = false;

  constructor( private productService: ProductService, private userService: UserService,private alertController: AlertController, private router: Router) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.approvedProducts = products.filter(product => product.aproved);
    });

    this.userService.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
      this.user = user; // Guarda información adicional del usuario si es necesario
      if(this.user.uid === "HIPaegVIAKO51sUXBCLASz0IiIv1") {
        this.isAdmin = true;
      }
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

  routeDetails(id: string | undefined) {
    if (id) {
      this.router.navigate(['/details-product',id]);
    } else {
      console.error('El producto no tiene id definido');
    }
  }

}
