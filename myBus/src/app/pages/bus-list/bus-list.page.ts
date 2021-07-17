import { Component, OnInit } from '@angular/core';
import { BusListService } from '../../services/bus-list.service';
import { ConnectivityService} from "../../services/connectivity.service";

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.page.html',
  styleUrls: ['./bus-list.page.scss'],
})
export class BusListPage implements OnInit {

  busList: any;

  constructor(private busListServices: BusListService,
              private connectivityService: ConnectivityService){}

  ngOnInit() {

    this.connectivityService.appIsOnline$.subscribe(online => {

      console.log(online);

      if (online){
        if (!this.busListServices.dataExist()) {
          this.busListServices.buses$.subscribe(bus => {
            this.busList = bus;
            var storableBusList = [];
            for (let busData of this.busList) {
              storableBusList.push(busData)
            }
            this.busListServices.storeBusListData(storableBusList);
          });
        }else {
          this.busListServices.getBusDataFromStorage().then(result => {
            this.busList = result;
          })
        }
      } else {
        if (this.busListServices.dataExist()){
          this.busListServices.getBusDataFromStorage().then(result => {
            console.log(result);
            this.busList = result;
          });
        }
      }
    })

  }

}
