import { Component, OnInit, OnDestroy } from '@angular/core';
import { HackerNewsService } from './hn.service';
import { HackerNews } from './hn';


@Component({
    selector: 'app-hackernews',
    templateUrl: 'hn.component.html'
})
export class HackerNewsComponent implements OnInit, OnDestroy {
    constructor(private hnService: HackerNewsService) { }

    topHN: any[];
    askHN: HackerNews[];
    itemUrl = (id: String) => `https://news.ycombinator.com/item?id=${id}`;
    topSub: any;
    askSub: any;
    fetch1Sub: any;
    fetch2Sub: any;

    ngOnInit() {
        this.topSub = this.hnService.fetchTopStories().subscribe(data => {
            this.topHN = data;
        });



        this.askSub = this.hnService.fetchAskStories().subscribe(data => {
            this.askHN = data;
        });


        // this.hnService.fetchTopStories().subscribe(console.info);
    }

    ngOnDestroy() {
        this.topSub.unsubscribe();
        this.askSub.unsubscribe();
        this.fetch1Sub.unsubscribe();
        this.fetch2Sub.unsubscribe();
    }
}