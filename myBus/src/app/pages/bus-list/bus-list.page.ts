import { Component, OnInit } from '@angular/core';
import { BusListService } from './bus-list.service';
import { Bus } from './bus.model';


@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.page.html',
  styleUrls: ['./bus-list.page.scss'],
})
export class BusListPage implements OnInit {

  busList: Bus[];

  constructor(private BuListServices: BusListService){}

  ngOnInit() {
    this.busList = this.BuListServices.getAllBus();
  }
  
}
