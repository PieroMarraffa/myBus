import { Injectable } from '@angular/core';
import { Bus } from '../models/bus.model';
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BusListService {

  bus$: Observable<Bus[]>;

  constructor(private afs: AngularFirestore) {
    this.bus$ = this.getAllBus().pipe(
      switchMap(bus => {
        if (bus){
          return this.afs.collection<Bus>('bus').valueChanges();
        } else{
          return of(null);
        }
      })
    )
  }

  getAllBus(){
    return this.afs.collection('bus').valueChanges() as Observable<Bus[]>;
  }

  getBus(busId: string){
    return this.afs.doc<Bus>(`bus/${busId}`).valueChanges() as Observable<Bus>;
  }
}

