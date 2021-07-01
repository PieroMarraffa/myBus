import { Injectable } from '@angular/core';
import { Stop } from './stop.model';

@Injectable({
  providedIn: 'root'
})
export class StopListService {

  constructor() { }

  private stopList: Stop[] = [
    {
    id: "1",
    nome: "terminal",
    latitudine: 214516516,
    longitudine: 818161619,
    },
    {
    id: "2",
    nome: "collemaggio",
    latitudine: 214516516,
    longitudine: 818161619,
    },
    {
    id: "3",
    nome: "roio",
    latitudine: 214516516,
    longitudine: 818161619,
    }
  ]
  getAllStop(){
    return[...this.stopList];
  }

  getStop(stopId: string){
    return {...this.stopList.find(Stop => {
      return Stop.id === stopId;
    })};
  }

}