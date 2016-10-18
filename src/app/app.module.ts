import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HackerNewsComponent } from './hackernews/hn.component';
import { HackerNewsService } from './hackernews/hn.service';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather/weather.service';
import { RedditComponent } from './reddit/reddit.component';
import { RedditService } from './reddit/reddit.service';
import { HeaderComponent, ArticleComponent} from '../app/shared/index';

@NgModule({
  declarations: [
    AppComponent, WeatherComponent, HackerNewsComponent, RedditComponent, HeaderComponent, ArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WeatherService, HackerNewsService, RedditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
