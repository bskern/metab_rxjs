import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Reddit } from './reddit';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RedditService {

    constructor(private Http: Http) { }

    getSubReddit(sr: String): Observable<Reddit[]> {
        const api = `https://www.reddit.com/r/${sr}.json`;
        return this.Http
            .get(api)
            .map((resp: Response) => resp.json())
            .pluck('data', 'children')
            .map(this.transform)
            .catch(this.handleError)
    }

    private transform(input: Array<any>): Array<Reddit> {
        return input.slice(0, 10).map(r => {
            return {
                url: r.data.url,
                title: r.data.title
            }
        });
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Service Error');
    }
}
