import {Injectable} from '@angular/core';
import {SmarthomeService} from './smarthome.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import User = firebase.User;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersPath = 'users';
  private usersCollection = 'users';

  constructor(
    private smarthomeService: SmarthomeService,
    private firestore: AngularFirestore
  ) {
  }

  getUser(userId: string): Observable<User> {
    return this.firestore.collection(this.usersCollection).doc<User>(userId).get().pipe(
      map<DocumentSnapshot<User>, User>(document => document.data())
    );
  }

  getFirebaseUser(userId: string): Observable<FirebaseUser> {
    return this.smarthomeService.get<FirebaseUser>(`${this.usersPath}/${userId}`);
  }

  listUsers(): Observable<User[]> {
    return this.firestore.collection<User>(this.usersCollection).get().pipe(
      map<QuerySnapshot<User>, User[]>(query => query.docs.map(document => document.data()))
    );
  }

  listFirebaseUsers(nextPageToken?: string): Observable<FirebaseUserPage> {
    return this.smarthomeService.get<FirebaseUserPage>(this.usersPath, nextPageToken ? {nextPageToken} : undefined);
  }

  getUserClaims(userId: string): Observable<Map<string, any>> {
    return this.smarthomeService.get(`${this.usersPath}/${userId}/claims`);
  }

  setUserClaims(userId: string, claims: Map<string, any>): Observable<Map<string, any>> {
    return this.smarthomeService.put<Map<string, any>, Map<string, any>>(`${this.usersPath}/${userId}/claims`, claims);
  }

}
