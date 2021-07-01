import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusListService } from '../bus-list.service';
import { Bus } from '../bus.model';
import { StopListService } from '../stop-list.service';
import { Stop } from '../stop.model';

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.page.html',
  styleUrls: ['./bus-detail.page.scss'],
})
export class BusDetailPage implements OnInit {
  LoadedBus: Bus;
  stopList: Stop[];
  LoadedStop: string[];
  LoadedTimeTable: string[];

  constructor(private activetedRouter: ActivatedRoute,
              private busListServices: BusListService,
              private stopListServices: StopListService) { }

  ngOnInit() {
    this.stopList = this.stopListServices.getAllStop();
    //this.LoadedStop = this.stopListServices.getAllStop();
    this.activetedRouter.paramMap.subscribe(paramMap => {
      if(!paramMap.has("busId")){
        //redirect
        return;
      }
      const busId = paramMap.get("busId");
      this.LoadedBus = this.busListServices.getBus(busId);
    })
      var key = (Object.keys(this.LoadedBus.percorso) as Array<string>);
      var x = [];
      var z = [];
      for (let i = 0; i < key.length; i++){
        let y = this.stopListServices.getStop(key[i]);
        x.push(y.nome);
        z.push(this.LoadedBus.percorso[key[i]]);
        console.log(x);
      }

      this.LoadedStop = x;
      this.LoadedTimeTable = z;
  };

  addPreferiti(){
    console.log(this.LoadedBus);
  }

}
