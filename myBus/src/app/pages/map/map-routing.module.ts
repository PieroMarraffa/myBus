import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPage} from "./map.page";
import {Geolocation} from "@ionic-native/geolocation/ngx";


const routes: Routes = [
  {
    path: '',
    component: MapPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [Geolocation],
})
export class MapPageRoutingModule {}
