import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleComponent} from 'app/article/article.component';
import {HomepageComponent} from 'app/homepage/homepage.component';
import {ArticleShowComponent} from './article/article-show.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent},
    { path: 'articles', component: ArticleComponent},
    // { path: 'article/new', component: ArticleNewComponent}
    { path: 'articles/:id', component: ArticleShowComponent}
]
@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}