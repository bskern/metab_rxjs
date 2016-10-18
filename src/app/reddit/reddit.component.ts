import { Component, OnInit } from '@angular/core';
import { RedditService } from './reddit.service';
import { Reddit } from './reddit';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-reddit',
    templateUrl: 'reddit.component.html'
})
export class RedditComponent implements OnInit {
    scalaSubReddit: Observable<Array<Reddit>>;
    elmSubReddit: Observable<Array<Reddit>>;
    reactSubReddit: Observable<Array<Reddit>>;

    constructor(private redditService: RedditService) { }

    ngOnInit() {
        this.scalaSubReddit = this.redditService.getSubReddit('scala');
        this.elmSubReddit = this.redditService.getSubReddit('elm');
        this.reactSubReddit = this.redditService.getSubReddit('reactjs');
    }
}