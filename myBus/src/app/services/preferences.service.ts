import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs";
import {Storage} from "@ionic/storage";

const PREFERENCE_STOREAGE_KEY = 'MY_PREFERENCE';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  preferencesCollection: AngularFirestoreCollection;
  preference = new BehaviorSubject({});

  constructor(private afs: AngularFirestore) {
    this.preferencesCollection = this.afs.collection('preferences');
    this.loadPreference();
  }

  getPreferences(){
    return this.preferencesCollection.valueChanges({ idField: 'id'});
  }

  async loadPreference(){
    //const result = await Storage.
  }

}
