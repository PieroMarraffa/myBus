import { Component, OnInit } from '@angular/core';
import { BusListService } from '../../services/bus-list.service';
import { Bus } from '../../models/bus.model';
import {Observable} from "rxjs";


@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.page.html',
  styleUrls: ['./bus-list.page.scss'],
})
export class BusListPage implements OnInit {

  busList: any;

  constructor(private busListServices: BusListService){}

  ngOnInit() {
    this.busListServices.buses$.subscribe(bus => {
      this.busList = bus;
      console.log(this.busList);
    })
  }

}
