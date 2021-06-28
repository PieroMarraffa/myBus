import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusListService } from '../bus-list.service';
import { Bus } from '../bus.model';

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.page.html',
  styleUrls: ['./bus-detail.page.scss'],
})
export class BusDetailPage implements OnInit {
  LoadedBus: Bus;

  constructor(private activetedRouter: ActivatedRoute, private busListServices: BusListService) { }

  ngOnInit() {
    this.activetedRouter.paramMap.subscribe(paramMap => {
      if(!paramMap.has("busId")){
        //redirect
        return;
      }
      const busId = paramMap.get("busId");
      this.LoadedBus = this.busListServices.getBus(busId);
    });
  }

}
