import { Injectable } from '@angular/core';
import { Observable, first, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from '../models/user';
import { Product } from '../models/product';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
//import { FieldValue } from 'firebase/firestore';
import * as firebase from 'firebase/app'; // Importa firebase/app
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private product: Observable<Product[]>;

  private productCollection: AngularFirestoreCollection<Product>;
  snaphotChangeSubscrition:any;


  constructor(
    private storage: AngularFireStorage, 
    private firestore: AngularFirestore) {
    this.productCollection=
    this.firestore.collection<Product>('product');
    this.product = 
    this.productCollection.valueChanges();
  }

  getProducts(): Observable<Product[]> {
    return this.product;
  }

  getProductById(productId: string): Observable<Product> {
    return this.firestore.doc<Product>(`product/${productId}`).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Product;
        const id = action.payload.id;
        return { id, ...data } as Product;
      })
    );
  }
  
  getProduct(productId: string): Observable<Product[]> {
    return this.firestore.doc<any>(`product/${productId}`).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as any;
        const id = action.payload.id;
        return { id, ...data };
      })
    );
  }

  getComments(productId: string): Observable<any[]> {
    return this.productCollection.doc(productId)
      .collection<Comment>('comments').valueChanges();
  }

  deleteCommentByIndex(productId: string, commentIndex: number) {
    // Obtén el documento como Observable
    const productDoc = this.productCollection.doc<Product>(productId).snapshotChanges();
  
    // Suscríbete al Observable para obtener el valor actual del documento
    productDoc.pipe(first()).subscribe(productSnap => {
      // Verifica si el documento existe
      if (productSnap.payload.exists) {
        // Obtiene el valor actual del campo 'comments' o inicializa un array vacío si no existe
        const currentComments = productSnap.payload.get('comments') || [];
  
        // Verifica si el índice es válido
        if (commentIndex >= 0 && commentIndex < currentComments.length) {
          // Elimina el comentario en el índice proporcionado
          currentComments.splice(commentIndex, 1);
  
          // Actualiza el campo 'comments' del documento con el nuevo array
          this.productCollection.doc(productId).update({ comments: currentComments });
        } else {
          // Si el índice no es válido, puedes manejarlo según tus necesidades
          console.error('Índice de comentario no válido.');
        }
      } else {
        // Si el documento no existe, puedes manejarlo según tus necesidades
        console.error('El documento no existe.');
      }
    });
  }
  
  

  addCommentToProduct(productId: string, user: string, comment: string, stars: number) {
    const commentInfo = {
      user,
      comment,
      date: new Date(),
      stars
    };
  
    // Obtén el documento como Observable
    const productDoc = this.productCollection.doc<Product>(productId).snapshotChanges();
  
    // Suscríbete al Observable para obtener el valor actual del documento
    productDoc.pipe(first()).subscribe(productSnap => {
      // Verifica si el documento existe
      if (productSnap.payload.exists) {
        // Obtiene el valor actual del campo 'comments' o inicializa un array vacío si no existe
        const currentComments = productSnap.payload.get('comments') || [];
        // Agrega el nuevo comentario al array
        currentComments.push(commentInfo);
  
        // Actualiza el campo 'comments' del documento con el nuevo array
        this.productCollection.doc(productId).update({ comments: currentComments });
      } else {
        // Si el documento no existe, puedes manejarlo según tus necesidades
        console.error('El documento no existe.');
      }
    });
  }
  
  

  addProducts(product: Product): Promise<any> {
    return this.productCollection.add(product).then((doc)=>{
      product.id = doc.id;
      this.productCollection.doc(product.id).update({ id: product.id });
      console.log("Producto añadido con id: "+doc.id)
      return product;
    })
    .catch(error => {
      console.log("Error al añadir el producto: "+error);
      return error;
    });
  }

  deleteProduct(product: Product): Promise<string> {
    this.productCollection.doc(product.id).delete();
    return Promise.resolve('success');
  }

  updateProduct(productid: string,product: Product): Promise<any> {
    return this.productCollection.doc(productid).update(product);
  }


  
  uploadFile(file: any, uid: string): Promise<any> {
    const filePath =   'Imagenes/' + uid + '/' + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = storageRef.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.then(snapshot => {
        resolve(snapshot.ref.getDownloadURL());
      }).catch(error => {
        reject(error);
      });
    });
  }

  approveProduct(product: Product): Promise<void> {

    if (!product.aproved) {
      product.aproved = true;
      return this.productCollection.doc(product.id).update({ aproved: true })
        .then(() => {
          console.log('Agregado correctamente');
        })
        .catch(error => console.error(error));
    } else {
      return this.productCollection.doc(product.id).update({ aproved: false })
        .then(() => {
          console.log('Desaprobado');
        })
        .catch(error => console.error(error));
    }
  }
  

}
