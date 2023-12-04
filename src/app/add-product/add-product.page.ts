import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  productForm: FormGroup;
  currentUser: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private productService: ProductService, 
    private userService: UserService, 
    private toastController: ToastController,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
      category: ['', Validators.required],
      cellphone: ['', Validators.required],
      aproved: [false, Validators.required],
    });

    this.userService.getAuthState().subscribe(user => {
      if (user) {
        this.currentUser = user.uid;
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  ngOnInit() {
    console.log(this.currentUser);
  }

  async addImage(event: any) {
    const image = event.target.files[0];
    this.userService.getAuthState().subscribe((user) => {
      if (user) {
        this.currentUser = user.uid;
        this.productService.uploadFile(image, this.currentUser);
      } else {
        console.log('No hay usuario autenticado');
      }
    });
    
  }

  async addProduct() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      try {
        // Agrega el producto a la colección en Firestore
        await this.productService.addProducts(product);

        console.log('Producto registrado exitosamente:', product);

        const toast = await this.toastController.create({
          message: 'Producto registrado correctamente',
          duration: 2000,
          position: 'top',
        });
        toast.present();

        // Redirige a la página de inicio después del registro
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al registrar el producto:', error);
      }
    } else {
      console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }
  }
}
