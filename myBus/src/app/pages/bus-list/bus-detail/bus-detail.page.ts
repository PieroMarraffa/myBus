import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bus } from "../../../models/bus.model";
import {Stop} from "../../../models/stop.model";
import {BusListService} from "../../../services/bus-list.service";
import {StopListService} from "../../../services/stop-list.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {PreferencesService} from "../../../services/preferences.service";
import {NavController, ToastController} from "@ionic/angular";
import {ConnectivityService} from "../../../services/connectivity.service";

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.page.html',
  styleUrls: ['./bus-detail.page.scss'],
})
export class BusDetailPage implements OnInit {
  loadedBus: any;
  stopList: any;
  stopList$: Stop;
  loadedBus$: Bus;
  LoadedStop: string[];
  LoadedTimeTable: string[];

  constructor(private activetedRouter: ActivatedRoute,
              private busListServices: BusListService,
              private stopListServices: StopListService,
              private afs: AngularFirestore,
              private preferenceService: PreferencesService,
              private toastController: ToastController,
              private navController: NavController,
              private connectivityService: ConnectivityService) { }

  ngOnInit() {
    this.stopListServices.stop$.subscribe(stop => {
      this.stopList = stop;
    });

    this.activetedRouter.paramMap.subscribe(paramMap => {
      if (!paramMap.has("busId")) {
        //redirect
        return;
      }

      const busId = paramMap.get("busId");
      this.connectivityService.appIsOnline$.subscribe(online => {

        if (online) {
          this.busListServices.getBus(busId).pipe(
            switchMap(bus => {
              if (bus) {
                return this.afs.collection<Bus>('bus', ref => ref.where('id', '==', busId)).valueChanges();
              } else {
                return of(null);
              }
            })
          ).subscribe(async bus => {
            this.loadedBus = bus;
            this.loadedBus$ = this.loadedBus[0];
            var key = (Object.keys(this.loadedBus$.percorso) as Array<string>);
            var x = [];
            var z = [];
            for (let i = 0; i < key.length; i++) {
              this.stopListServices.getStop(key[i]).pipe(
                switchMap(stop => {
                  if (stop) {
                    return this.afs.collection<Stop>('stop', ref => ref.where('id', '==', key[i])).valueChanges();
                  }
                })
              ).subscribe(stop => {
                this.stopList = stop;
                this.stopList$ = this.stopList[0];
                x.push(this.stopList$.nome);
                z.push(this.loadedBus$.percorso[key[i]]);
              });
            }
            this.LoadedStop = x;
            this.LoadedTimeTable = z;
          });

          this.stopListServices.stop$.subscribe(stop => {
            var storableStopData = [];
            for (let stopData of stop){
              storableStopData.push(stopData);
            }
            this.stopListServices.storeStopListData(storableStopData);
          });
        } else {
          if (this.stopListServices.dataExist()){
            this.stopListServices.getStopFromStorage().then(result => {
              this.busListServices.getSingleBusFromStorage(busId).then(bus => {
                this.loadedBus$ = bus;
                var key = (Object.keys(this.loadedBus$.percorso) as Array<string>);
                var x = [];
                var z = [];
                for (let i = 0; i < key.length; i++){
                  this.stopListServices.getSingleStopFromStorage(key[i]).then(stop => {
                    this.stopList = stop;
                    x.push(this.stopList.nome);
                    z.push(this.loadedBus$.percorso[key[i]]);
                  });
                }
                this.LoadedStop = x;
                this.LoadedTimeTable = z;
              })
            })
          }
        }
      })
    })
  }



  addToPreferences(bus){
    this.preferenceService.addToPreferences(bus);
    this.navController.navigateRoot('preferences');
  }
}
