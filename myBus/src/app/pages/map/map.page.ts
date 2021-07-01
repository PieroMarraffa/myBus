import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})

export class MapPage {
  @ViewChild('map', { static: true }) mapElement;

  map: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null };
  infoWindows: any[];
  markers: any =[{
    title: "casetta",
    latitudine:"42.34467",
    longitudine:"13.40131"},
    ];

  constructor(private geolocation: Geolocation) {
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
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      this.addMarker(this.markers);
    });
  }

  addMarker(markers){
    for(let marker of markers){
      let position= new google.maps.LatLng(marker.latitudine,marker.longitudine);
      let mapMarker= new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitudine,
        longitude: marker.longitudine,

      })

      mapMarker.setMap(this.map);
      this.addInfoWindowMarker(marker);
    }
  }

  addInfoWindowMarker(marker){
    let infoWindowMarker = "<div id='content'>" +
      "<h2 id='firstHeading' class='firstHeading'>" + marker.title + "</h2>"
                              +"<h2>" + "ciao" + marker.latitudine + "</h2></div>";
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowMarker,
      maxWidth: 400
    });
    marker.addEventListener('click', () => {
      this.closeAllInfoWindow();
    infoWindow.open(this.map);
  })
    this.infoWindows.push(infoWindow);
  }
  closeAllInfoWindow(){
    for(let window of this.infoWindows){
      window.close()
    }
  }

}






