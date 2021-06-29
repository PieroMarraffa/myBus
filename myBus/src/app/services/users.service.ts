import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";

export interface User{
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUser: User;

  constructor(private afs:AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
    })
  }

  async signUp({ email, password, cpassword }){
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );


    const uid = credential.user.uid;

    return this.afs.doc(
      `profiles/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    })
  }

  signIn({ email, password }){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.afAuth.signOut();
  }


}
