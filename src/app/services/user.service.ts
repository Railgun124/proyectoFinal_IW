import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


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

}
