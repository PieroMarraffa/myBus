import { Injectable } from '@angular/core';
import { Bus } from '../models/bus.model';
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {switchMap} from "rxjs/operators";
import { Storage } from "@ionic/storage";

const BUS_LIST_KEY = 'BUS_LIST_KEY';

@Injectable({
  providedIn: 'root'
})
export class BusListService {

  buses$: Observable<Bus[]>;

  constructor(private afs: AngularFirestore, private storage: Storage) {
    this.storage.create();
    this.buses$ = this.getAllBus().pipe(
      switchMap(bus => {
        if (bus){
          return this.afs.collection<Bus[]>('bus').valueChanges();
        } else{
          return of(null);
        }
      })
    );
  }

  getAllBus(){
    return this.afs.collection('bus').valueChanges() as Observable<Bus[]>;
  }

  getBus(busId: string){
    return this.afs.collection('bus', ref => ref.where('id', '==', busId)).valueChanges();
  }

  storeBusListData(bus){
    return this.storage.set(BUS_LIST_KEY, bus);
  }

  containsObject(obj, list): boolean{
    if (!list.length || obj == null){
      return false;
    }

    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id == obj.id){
        return true;
      }
    }
    return false;
  }

  dataExist(): boolean{
    if (this.storage.get(BUS_LIST_KEY)){
      return true;
    }
    return false;
  }

  getBusDataFromStorage(){
    return this.storage.get(BUS_LIST_KEY);
  }
}

