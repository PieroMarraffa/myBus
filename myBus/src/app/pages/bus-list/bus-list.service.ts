import { Injectable } from '@angular/core';
import { Bus } from './bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusListService {

  constructor() { }

  private busList: Bus[] = [
    {
    id: "1",
    nome: "M11",
    percorso: {"1": ["8", "8.20", "8.40"],
               "3": ["9", "9.20", "9.40"],
              }
    },
    {
    id: "2",
    nome: "1R",
    percorso: {"1": ["8", "8.20", "8.40"],
               "2": ["9", "9.20", "9.40"],
              }
    },
  ]

  getAllBus(){
    return[...this.busList];
  }

  getBus(busId: string){
    return {...this.busList.find(Bus => {
      return Bus.id === busId;
    })};
  }
}

