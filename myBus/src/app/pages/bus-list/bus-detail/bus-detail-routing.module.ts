import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusDetailPage } from './bus-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BusDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusDetailPageRoutingModule {}
