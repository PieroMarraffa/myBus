import { Injectable } from '@angular/core';
import { Stop } from '../models/stop.model';
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StopListService {

  stop$: Observable<Stop[]>

  constructor(private afs: AngularFirestore) {
    this.stop$ = this.getAllStop().pipe(
      switchMap(stop => {
        if (stop){
          return this.afs.collection<Stop>('stop').valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  getAllStop(){
    return this.afs.collection('stop').valueChanges() as Observable<Stop[]>;
  }

  getStop(stopId: string){
    return this.afs.collection('stop', ref => ref.where('id','==', stopId)).valueChanges();
  }

}
