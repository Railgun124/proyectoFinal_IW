import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from '../models/user';
import { Product } from '../models/product';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private product: Observable<Product[]>;

  private productCollection: AngularFirestoreCollection<Product>;
  snaphotChangeSubscrition:any;


  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {
    this.productCollection=
    this.firestore.collection<Product>('product');
    this.product = 
    this.productCollection.valueChanges();
  }

  getProducts(): Observable<Product[]> {
    return this.product;
  }

  /*getProducts(): Observable<Product[]> {
    return this.productCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }*/

  addProducts(product: Product): Promise<any> {
    return this.productCollection.add(product).then((doc)=>{
      //user.id = doc.id;
      console.log("Producto añadido con id: "+doc.id)
      return product;
    })
    .catch(error => {
      console.log("Error al añadir el producto: "+error);
      return error;
    });
  }

  uploadFile(file: any, uid: string): Promise<any> {
    const filePath =   'Imagenes/' + uid + '/' + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = storageRef.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.then(snapshot => {
        resolve(snapshot);
      }).catch(error => {
        reject(error);
      });
    });
  }
  



}
