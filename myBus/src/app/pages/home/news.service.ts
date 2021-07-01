import { Injectable } from '@angular/core';
import {News} from "./news.model";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newses: News[] = [
    {
      id: "1",
      title: "Gatto sull'autobus",
      description: "il gatto è bello",
      data:"15/02/2021",
      imageUrl:"https://www.ilmiogattoeleggenda.it/wp-content/uploads/2019/05/gatto-che-prende-mezzi-pubblici.jpg"
    },
    {
      id: "2",
      title: "kitamuort",
      description: "il gatto era bello",
      data:"16/02/2021",
      imageUrl:"https://www.quotidianodipuglia.it/photos/MED_HIGH/24/69/6012469_1948_bari_bus_in_fiamme_lungomare.jpg"
    }
  ]

  constructor() { }

  getAllNews(){
    return[...this.newses];
  }

  getNews(newsID: string){
    return{
      ...this.newses.find(news =>{
        return news.id=== newsID;
      })
    };

  }


}
