import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class HackerNewsService {

    hn = 'https://hacker-news.firebaseio.com/';
    v = 'v0/';
    askEndpoint = `${this.hn}${this.v}askstories.json`;
    topEndpoint = `${this.hn}${this.v}topstories.json`;
    itemEndpoint = (id: String) => `${this.hn}${this.v}item/${id}.json`
    itemUrl = (id: String) => `https://news.ycombinator.com/item?id=${id}`;

    constructor(private http: Http) {}

    fetchAskStories() {
        return this.http
            .get(this.askEndpoint)
            .flatMap((res, idx) => {
                return Observable.from(res.json().slice(0, 15))
                    .concatMap(id => this.fetchItem(id))
                    .toArray();
            });
    }

    fetchTopStories() {
        return this.http
            .get(this.topEndpoint)
            .flatMap((res, idx) => {
                return Observable.from(res.json().slice(0, 15))
                    .concatMap(id => this.fetchItem(id))
                    .toArray();
            });
    }

    private fetchItem(id: any): Observable<any> {
        return this.http
            .get(this.itemEndpoint(id))
            .map(response => this.updateUrlForAskItem(response.json()))
            .catch(this.handleError);
    }

    private updateUrlForAskItem(item) {
        let url = this.itemUrl(item.id);
        item.url = url;
        return item;

    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Service Error');
    }

}

