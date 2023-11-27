import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Observable<User[]>;

  private userCollection: AngularFirestoreCollection<User>;
  snaphotChangeSubscrition:any;

  constructor(private firestore: AngularFirestore) { 
    this.userCollection = 
    this.firestore.collection<User>('user');
    this.user = 
    this.userCollection.valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  addUser(user: User): Promise<any> {
    return this.userCollection.add(user).then((doc)=>{
      //user.id = doc.id;
      console.log("Usuario añadido con id: "+doc.id)
      return user;
    })
    .catch(error => {
      console.log("Error al añadir el usuario: "+error);
      return error;
    });
  }

  searchUser(username: string, nip: string): Observable<User[]> {
    return new Observable((observer) => {
      this.userCollection.ref
        .where('username', '==', username)
        .where('nip', '==', nip)
        .get()
        .then((querySnapshot) => {
          const users = querySnapshot.docs.map((doc) => {
            const data = doc.data() as User;
            const id = doc.id;
            return { id, ...data };
          });
          observer.next(users);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }
  
}


