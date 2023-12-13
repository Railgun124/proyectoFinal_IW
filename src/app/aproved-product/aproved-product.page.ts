import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-aproved-product',
  templateUrl: './aproved-product.page.html',
  styleUrls: ['./aproved-product.page.scss'],
})
export class AprovedProductPage {
  public products: Product[] = [];
  public approvedProducts: Product[] = [];
  public unapprovedProducts: Product[] = [];
  user: any;
  isAdmin = false;
  isAuthenticated = false;

  constructor( private productService: ProductService, private router: Router,
    private userService: UserService
    ,private alertController: AlertController) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.approvedProducts = products.filter(product => product.aproved);
      this.unapprovedProducts = products.filter(product => !product.aproved);
      this.userService.getAuthState().subscribe(user => {
        this.isAuthenticated = !!user;
        this.user = user; // Guarda información adicional del usuario si es necesario
        if(this.user.uid === "HIPaegVIAKO51sUXBCLASz0IiIv1") {
          this.isAdmin = true;
        }
      });
    
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
  

  async approveProduct(product: Product) {
    try {
      const result = await this.productService.approveProduct(product);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  

}
