import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticleShowComponent } from './article/article-show.component';
import { ArticleService } from './article/article.service';
import { HomepageComponent } from './homepage/homepage.component'

import {AppRoutingModule} from './app.routing'
@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HomepageComponent,
    ArticleShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
