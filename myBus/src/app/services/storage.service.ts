import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { this.storage.create(); }

  setData(key, item){
    return this.storage.set(key, item);
  }

  getData(key){
    return this.storage.get(key);
  }

  removeData(key){
    return this.storage.remove(key);
  }
}
