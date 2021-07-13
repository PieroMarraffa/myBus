import { Component, OnInit } from '@angular/core';
import {News} from '../../models/news.model';
import {NewsService} from './news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  newses: News[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newses=this.newsService.getAllNews();
  }

}
