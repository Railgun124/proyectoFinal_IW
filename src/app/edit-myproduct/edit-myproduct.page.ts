import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Product } from '../models/product';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-myproduct',
  templateUrl: './edit-myproduct.page.html',
  styleUrls: ['./edit-myproduct.page.scss'],
})
export class EditMyproductPage implements OnInit {
  updateForm: FormGroup;
  public productId: string | null = null;
  public products: Product[] = [];
  public user: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      cellphone: ['', Validators.required],
    });
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId !== null) {
      this.productService.getProductById(this.productId).subscribe(
        (product: Product | undefined) => {
          if (product) {
            this.products = [product];
            this.updateForm.setValue({
              name: product.name,
              price: product.price,
              description: product.description,
              category: product.category,
              cellphone: product.cellphone,
            });
            if (product.salesman) {
              this.userService.getUserByEmail(product.salesman).subscribe(
                (user: User | undefined) => {
                  if (user) {
                    this.user = [user];
                  }
                }
              );
            }
          } else {
            console.error('Producto no encontrado');
          }
        }
      );
    } else {
      console.error('ID del producto es null');
    }
  }

  async updateProduct() {
    if (this.updateForm.valid) {
      if (this.productId !== null) {
        this.productService.updateProduct(this.productId, this.updateForm.value as Product).then(async ()=>{
          const toast = await this.toastController.create({
            message: 'Producto actualizado correctamente',
            duration: 2000,
            position: 'top',
          });
          toast.present();

          this.router.navigate(['/home']);
        },
        );
      }

    }

  }

  ngOnInit() {
  }

}
