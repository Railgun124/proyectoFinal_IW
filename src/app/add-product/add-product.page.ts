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

// Agrega una propiedad para almacenar la imagen en tu componente
selectedImage: File | null = null;

// Tu método original para manejar la carga de la imagen
async addImage(event: any) {
  const image = event.target.files[0];
  this.userService.getAuthState().subscribe((user) => {
    if (user) {
      this.currentUser = user.uid;
      this.selectedImage = image; // Almacena la imagen en la variable del componente
      console.log('Imagen seleccionada:', this.selectedImage);
    } else {
      console.log('No hay usuario autenticado');
    }
  });
}

// Método para agregar el producto utilizando la imagen almacenada en el componente
async addProduct() {
  if (this.productForm.valid) {
    const product = this.productForm.value;
    try {
      // Utiliza la imagen almacenada en el componente
      const imageFile = this.selectedImage;

      if (!imageFile) {
        console.log('No hay imagen');
      } else {
        this.userService.getAuthState().subscribe(async (user) => {

        if (user) {
          this.currentUser = user.uid;
          try {
            const url = await this.productService.uploadFile(imageFile, this.currentUser);
            console.log(url);
            product.image = url;
            await this.productService.addProducts(product);
            console.log('Producto registrado exitosamente:', product);

            const toast = await this.toastController.create({
              message: 'Producto registrado correctamente',
              duration: 2000,
              position: 'top',
            });
            toast.present();

            this.router.navigate(['/home']);
          } catch (error) {
            console.error('Error al registrar el producto:', error);
          }
        } else {
          console.log('No hay usuario autenticado');
        }
      });
      }
    } catch (error) {
      console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }
  }
}

}