import { Component, ViewChild, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StopListService } from "../../services/stop-list.service";
import {NavController} from "@ionic/angular";

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapElement;

  stopList: any;

  map: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null };
  infoWindows: any[];
  markers: any =[];

  constructor(private geolocation: Geolocation,
              private stopListServices: StopListService,
              public navCtrl: NavController) {


  }

  ngOnInit() {  this.stopListServices.stop$.subscribe(stop => {
    this.stopList = stop;
    this.loadMarker();
    this.loadMap();

  });
  }

  loadMarker(){
    for(let i=0; i<this.stopList.length; i++){
      let stop: any;
      stop=this.stopList[i];
      let title=stop.nome
      let latitude= stop.latitudine;
      let longitude= stop.longitudine;
      let marker=[title,latitude,longitude];
      this.markers.push(marker);
    }
  }


  addMarker(){
    for(let marker of this.markers){
      let position= new google.maps.LatLng(marker[1],marker[2]);
      console.log(marker);
      let mapMarker= new google.maps.Marker({
        map: this.map,
        position: position,
        title: marker[0],
      })


    }
  }
  loadMap(){
    this.geolocation.getCurrentPosition().then((resp) => {
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenter.lat = 42.34467;
      this.mapCenter.lng = 13.40131;
      this.mapOptions = {
        zoom: 15,
        center: this.mapCenter
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      this.addMarker();

    });

  }



}






