import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../news.service";
import {News} from "../../../models/news.model";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  loadedNews: News;

  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('newsId')){
        return;
      }
      const newsId= paramMap.get('newsId');
      this.loadedNews= this.newsService.getNews(newsId);

    })

  }
}
