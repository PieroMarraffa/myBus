import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  newses: any;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.newses$.subscribe(news => {
      this.newses = news;
    })
  }

}
