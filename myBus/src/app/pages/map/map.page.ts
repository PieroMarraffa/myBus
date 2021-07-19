import { Component, ViewChild, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StopListService } from "../../services/stop-list.service";
import {NavController, NavParams} from "@ionic/angular";
import { BusListService } from '../../services/bus-list.service';
import {Bus} from "../../models/bus.model";
import {BusListPage} from "../bus-list/bus-list.page";
import {RouterLink} from "@angular/router";
import { NgZone } from '@angular/core';


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
  infoWindow: any=[];
  markers: any =[];
  p: any=[];

  constructor(private geolocation: Geolocation,
              private stopListServices: StopListService,
              private busListServices:BusListService,
              public navCtrl: NavController,
              private _ngZone:NgZone) {


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


  addInfoWindow(marker){
    let fermata = this.getStop(marker.id);
    let box='';
    if(fermata!=false) {
      let cont=0;
      for(let i of fermata){
      let contentString = ('<ion-button href= "tabs/busList/' + fermata[cont].id+ '">' +
        '<h1 id="firstHeading" class="firstHeading">' + fermata[cont].nome + '</h1></ion-button>');
      box= box  + contentString;
      cont ++;
      }

      let infowindow = new google.maps.InfoWindow({
        content: box,
        maxWidth: 200,
        minWidth:200,
      });


      marker.addListener('click',()=> {
          this.closeAllInfoWindow();
          infowindow.setContent('<h1 align="center" id="firstHeading" class="firstHeading"><b>'+  marker.title +'</b></h1> \n' + box );
          infowindow.open(this.map, marker);


        })

      this.infoWindow.push(infowindow);
      console.log(this.infoWindow);
    }
  }
  closeAllInfoWindow(){
    for(let i of this.infoWindow){
      i.close();
    }
  }

  getStop(Stop){
    let bus_per_fermata= [];
    for( let b of this.busList){
      var key = (Object.keys(b.percorso) as Array<string>);
      for(let k of key){
        if (Stop == k) {
          bus_per_fermata.push(b);
        }
        }
      }
    if(bus_per_fermata.length>0){
       return bus_per_fermata;}
    else{return false;}
  }
}






