import { Component, OnInit, Input } from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';
import { Article } from './article';
import { ArticleService } from './article.service';
// import { NgModule } from '@angular/core';
@Component({
    selector: 'article-show',
    templateUrl: 'article-show.component.html',
    styleUrls: ['article.component.css']
})
export class ArticleShowComponent implements OnInit{
    id: number;
    routeId: any;
    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private articleService: ArticleService
    ){}
    @Input() article: Article;
    ngOnInit(){
        this.routeId = this.route.params.subscribe(
            params => {
                this.id = +params['id'];
                // console.log(this.id = +params['id']);
                
            }
        )
        let articleRequest = this.route.params
            .flatMap((params: Params) => this.articleService.getArticle(+params['id']));
        articleRequest.subscribe(response => this.article = response.json());

        
    }
    
}
