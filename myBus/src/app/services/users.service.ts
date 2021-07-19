import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {Observable, of} from "rxjs";
import { User } from "../models/user.model"
import {switchMap} from "rxjs/operators";
import firebase from "firebase";


export interface Users{
  uid: string;
  email: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uid: string;
  credential: any;
  currentUser: Users = null;
  user$: Observable<User>;

  constructor(private afs:AngularFirestore,
              private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
    });
    this.user$ = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user){
            return this.afs.doc<User>(`profiles/${this.currentUser.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      )
  }

  getUid(){
    return this.currentUser.uid;
  }

  getCurrentUser(){
    return this.afs.doc(`profiles/${this.currentUser.uid}`).get();
  }

  getUsers(){
    return this.afs.collection('profiles').valueChanges({idField: 'uid'}) as Observable<User[]>;
  }

  async signUp({ email, password, nome, cognome }) {

    this.credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: nome + ' ' + cognome
    })

    this.uid = this.credential.user.uid;

    return this.afs.doc(
      `profiles/${this.uid}`
    ).set({
      uid: this.uid,
      email: this.credential.user.email,
      name: nome,
      surame: cognome,
    })
  }

  signIn({ email, password }){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.afAuth.signOut();
  }

  async changeCredentials(displayName=null, email=null, password=null) {
    const user = firebase.auth().currentUser;

    if (displayName != null) {
      user.updateProfile({
        displayName: displayName,
      }).then(() => {
        this.afAuth.onAuthStateChanged(user => {
          console.log('Changed: ', user);
          this.currentUser = user;

          var namSur = displayName.split(' ');

          return this.afs.doc(`profiles/${user.uid}`).update({
            name: namSur[0],
            surame: namSur[1]
          })
        })
      }).catch((error) => {
        console.log(error);
      });
    }

    if (email != null){
      user.updateEmail(email).then(() => {
        this.afAuth.onAuthStateChanged(user => {
          console.log('Changed: ', user);
          this.currentUser = user;

          return this.afs.doc(`profiles/${user.uid}`).update({
            email: email
          });
        });
      }).catch((error) => {
        console.log(error);
      })
    }

    if (password != null){
      user.updatePassword(password).then(() => {
        this.afAuth.onAuthStateChanged(user => {
          console.log('Changed: ', user);
          this.currentUser = user;
        })
      }).catch((error) => {
        console.log(error);
      });
    }


  }
}
