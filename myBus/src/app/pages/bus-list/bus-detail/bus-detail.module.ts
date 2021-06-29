import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusDetailPageRoutingModule } from './bus-detail-routing.module';

import { BusDetailPage } from './bus-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusDetailPageRoutingModule
  ],
  declarations: [BusDetailPage]
})
export class BusDetailPageModule {}
