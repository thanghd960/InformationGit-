import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Article } from './article';
import { ArticleService } from './article.service';
import { Router } from "@angular/router";
// import { NgModule } from '@angular/core';
// import {ArticleShowComponent} from './article-show.component'
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles: Article[];
  

  constructor(
    private articleService: ArticleService,
    private router: Router
    
  ) { }

  ngOnInit() {
    let timer = Observable.timer(0,5000);
    timer.subscribe(()=>this.getArticles());
  
  }
  getArticles(){
    this.articleService.getArticles().subscribe(articles => this.articles = articles)
  }
  goToShow(article: Article): void {
    let articleLink = ['/articles', article.id];
    this.router.navigate(articleLink);
  }

}


