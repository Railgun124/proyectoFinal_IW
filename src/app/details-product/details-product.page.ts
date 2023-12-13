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
export class DetailsProductPage {
  public products: Product[] = [];
  public user: User[] = [];
  public comentarios: any[] = [];
  public productId: string | null = null;

  isAuthenticated = false;
  userAuth: any;
  isAdmin = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, 
    private userService: UserService, private router: Router) {
    this.userService.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
      this.userAuth = user; // Guarda información adicional del usuario si es necesario
      if (this.userAuth.uid === "HIPaegVIAKO51sUXBCLASz0IiIv1") {
        this.isAdmin = true;
      }
    });
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId !== null) {
      this.productService.getComments(this.productId).subscribe(
        (comments: Comment[] | undefined) => {
          if (comments) {
            this.comentarios = comments;
          } else {
            console.error('No hay comentarios');
          }
        }
      );
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

  deleteComment(commentid: number) {
    if(this.productId!==null){
      this.productService.deleteCommentByIndex(this.productId, commentid);
    }
    
  }
  
  formatDate(timestamp: any): string {
    const milliseconds = typeof timestamp === 'number' ? timestamp : timestamp.toMillis();
    const date = new Date(milliseconds);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }


  openAddComment() {
    this.router.navigate(['/comments-product', this.productId]);
  }

}
