import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.page.html',
  styleUrls: ['./details-product.page.scss'],
})
export class DetailsProductPage implements OnInit {
  public products: Product[] = [];
  public user: User[] = [];
  productId: string | null = null;

  constructor(private route: ActivatedRoute,private productService: ProductService,private userService: UserService,private router: Router) {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId !== null) {
      this.productService.getProductById(this.productId).subscribe(
        (product: Product | undefined) => {
          if (product) {
            this.products = [product];

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

  openAddComment() {
    this.router.navigate(['/comments-product']);
  }

  ngOnInit(): void {}
}
