import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEmailSubject = new BehaviorSubject<string>('');
  userEmail$ = this.userEmailSubject.asObservable();
  private user: Observable<User[]>;

  private userCollection: AngularFirestoreCollection<User>;
  snaphotChangeSubscrition:any;

  authState: Observable<firebase.default.User | null>;

  constructor(private firestore: AngularFirestore,private afAuth:AngularFireAuth) { 
    this.userCollection = 
    this.firestore.collection<User>('user');
    this.user = 
    this.userCollection.valueChanges();

    this.authState = this.afAuth.authState;
  }

  setUserEmail(email: string) {
    this.userEmailSubject.next(email);
  }

  getAuthState(): Observable<firebase.default.User | null> {
    return this.authState;
  }

  register (user: User): Promise<any> {
    var email=user.email;
    var password=user.noControl;
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login (user: User): Promise<any> {
    var email=user.email;
    var password=user.noControl;
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout (): Promise<any> {
    return this.afAuth.signOut();
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

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.email === email))
    );
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


