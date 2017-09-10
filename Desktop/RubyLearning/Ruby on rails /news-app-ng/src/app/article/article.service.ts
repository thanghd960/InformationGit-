import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Article } from './article'

@Injectable()
export class ArticleService{
    private articlesUrl = "http://localhost:3000/articles";
    constructor(private http: Http){}
    getArticles(): Observable<Article[]>{
        return this.http.get(this.articlesUrl).map((response: Response) => <Article[]>response.json())
            
    }
    getArticle(id: number){
        return this.http.get(this.articlesUrl + "/" + id + '.json');
    }
}

