import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Product } from '../models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-comments-product',
  templateUrl: './comments-product.page.html',
  styleUrls: ['./comments-product.page.scss'],
})
export class CommentsProductPage implements OnInit {
  comentarioForm : FormGroup;

  public products: Product[] = [];
  public approvedProducts: Product[] = [];
  public id: any;
  public email: string = "";
  constructor(private userService: UserService, 
    private router: Router, 
    private toastController: ToastController, 
    private productService: ProductService, 
    private formBuilder: FormBuilder,
    private routerActivateRoute: ActivatedRoute) {
      this.comentarioForm = this.formBuilder.group({
        comment: ['', Validators.required],
        stars: ['', Validators.required],
      })

    this.id = this.routerActivateRoute.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.approvedProducts = products.filter(product => product.aproved);
    });
    
  } 

  ngOnInit() {
    this.userService.userEmail$.subscribe((email) => {
      // Aquí obtienes el email del usuario y puedes hacer lo que necesites con él
      this.email = email;
    });
  }

  

  GuardarComentario(){
    console.log(this.comentarioForm.value.comment);
    console.log(this.comentarioForm.value.stars);
    console.log(this.id);
    console.log(this.email);
    if(this.comentarioForm.valid){
      this.productService.addCommentToProduct(this.id, this.email, this.comentarioForm.value.comment, this.comentarioForm.value.stars);
      this.router.navigate(['/details-product', this.id]);
    }
}


}