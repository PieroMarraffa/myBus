import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bus } from "../../../models/bus.model";
import {Stop} from "../../../models/stop.model";
import {BusListService} from "../../../services/bus-list.service";
import {StopListService} from "../../../services/stop-list.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {UsersService} from "../../../services/users.service";
import {User} from "../../../models/user.model";
import {element} from "protractor";
import {PreferencesService} from "../../../services/preferences.service";

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.page.html',
  styleUrls: ['./bus-detail.page.scss'],
})
export class BusDetailPage implements OnInit {
  loadedBus: any;
  stopList: any;
  user: User;
  stopList$: Stop;
  loadedBus$: Bus;
  LoadedStop: string[];
  LoadedTimeTable: string[];

  constructor(private activetedRouter: ActivatedRoute,
              private busListServices: BusListService,
              private stopListServices: StopListService,
              private afs: AngularFirestore,
              private userService: UsersService,
              private preferencesService: PreferencesService) {}

  ngOnInit() {
    console.log("Eccomi");
    this.preferencesService.getPreferences().subscribe(result => {
      console.log(result);
    });

    this.stopListServices.stop$.subscribe(stop => {
      this.stopList = stop;
      console.log(this.stopList)
    });

    this.activetedRouter.paramMap.subscribe(paramMap => {
      if (!paramMap.has("busId")) {
        //redirect
        return;
      }

      const busId = paramMap.get("busId");
      this.busListServices.getBus(busId).pipe(
        switchMap( bus => {
          if (bus) {
            return this.afs.collection<Bus>('bus', ref => ref.where('id','==',busId)).valueChanges();
          } else {
            return of(null);
          }
        })
      ).subscribe(async bus => {
        this.loadedBus = bus;
        this.loadedBus$ = this.loadedBus[0];
        console.log("cicca" + "iapalla");
        console.log(this.loadedBus[0].percorso);
        var key = (Object.keys(this.loadedBus$.percorso) as Array<string>);
        var x = [];
        var z = [];
        for (let i = 0; i < key.length; i++){
          this.stopListServices.getStop(key[i]).pipe(
            switchMap( stop => {
              if (stop){
                return this.afs.collection<Stop>('stop', ref => ref.where('id', '==', key[i])).valueChanges();
              }
            })
          ).subscribe( stop => {
            this.stopList = stop;
            this.stopList$ = this.stopList[0];
            x.push(this.stopList[0].nome);
            z.push(this.loadedBus[0].percorso[key[i]]);
          });
        }

        this.LoadedStop = x;
        this.LoadedTimeTable = z;
      });
      })
    }

  async addPreferiti(){
      await this.userService.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
      if (this.user.preferences == null || this.user.preferences.length == 0){
        this.user.preferences = [];
        this.user.preferences.push(this.loadedBus$.id);
      }else if (this.user.preferences.find(element => element != this.loadedBus$.id)){
        this.user.preferences.push(this.loadedBus$.id);
      }
      return  this.afs.doc(`profiles/${this.user.uid}`).update({
        preferences: this.user.preferences,
      })
    })
  }

}
