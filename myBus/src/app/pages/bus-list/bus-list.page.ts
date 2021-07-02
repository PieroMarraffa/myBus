import { Component, OnInit } from '@angular/core';
import { BusListService } from './bus-list.service';
import { Bus } from '../../models/bus.model';


@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.page.html',
  styleUrls: ['./bus-list.page.scss'],
})
export class BusListPage implements OnInit {

  busList: Bus[];

  constructor(private BusListServices: BusListService){}

  ngOnInit() {
    this.busList = this.BusListServices.getAllBus();
  }

}
