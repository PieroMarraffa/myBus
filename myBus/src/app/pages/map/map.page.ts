import { Component, ViewChild, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StopListService } from "../../services/stop-list.service";
import {NavController, NavParams} from "@ionic/angular";
import { BusListService } from '../../services/bus-list.service';
import {Bus} from "../../models/bus.model";
import {BusListPage} from "../bus-list/bus-list.page";
import {RouterLink} from "@angular/router";


declare var google;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapElement;

  stopList: any;
  busList:any;
  map: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null };
  infoWindows: any[];
  markers: any =[];

  constructor(private geolocation: Geolocation,
              private stopListServices: StopListService,
              private busListServices:BusListService,
              public navCtrl: NavController) {


  }

  ngOnInit() {
    this.busListServices.buses$.subscribe(bus => {this.busList = bus});
    this.stopListServices.stop$.subscribe(stop => {
    this.stopList = stop;
    this.loadMarker();
    this.loadMap();

  });
  }

  loadMarker(){
    for(let i=0; i<this.stopList.length; i++){
      let stop: any;
      stop=this.stopList[i];
      let id=stop.id;
      let title=stop.nome
      let latitude= stop.latitudine;
      let longitude= stop.longitudine;
      let marker=[title,latitude,longitude,id];
      this.markers.push(marker);
    }
  }

  addMarker(){
    for(let marker of this.markers){
      let position= new google.maps.LatLng(marker[1],marker[2]);
      let mapMarker= new google.maps.Marker({
        map: this.map,
        position: position,
        title: marker[0],
        id: marker[3],
      })
      this.addInfoWindow(mapMarker);
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
  goToBus(){
   this.navCtrl.navigateRoot("");
  }
  addInfoWindow(marker){
    let fermata = this.getStoppino(marker.id);
    let box: string;
    console.log(fermata,marker.id);
    if(fermata!=false) {
      let  cont=0;
      for(let i of fermata){
      let contentString = ('<ion-button  href="bus-list/Bus.Id">' +
        '<h1 id="firstHeading" class="firstHeading">' + fermata[cont].nome + '</h1></ion-button>')
      box = box + contentString;
      cont ++;}

      const infowindow = new google.maps.InfoWindow({

        content: box,
      });
      google.maps.event.addListener(marker, "click", (function (marker) {
        return function () {
          infowindow.setContent(box);
          infowindow.open(this.map, marker);
        }
      })(marker));
    }
  }
  getStoppino(Stop){
    let bus_per_fermata= [];
    for( let bus of this.busList){
      var key = (Object.keys(bus.percorso) as Array<string>);
      for(let k of key){
        if (Stop == k) {
          bus_per_fermata.push(bus);
        }
        }
      }
    if(bus_per_fermata.length>0){
       return bus_per_fermata;}
    else{return false;}
  }



}






