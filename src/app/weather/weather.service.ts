import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Weather } from './weather';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WeatherService {
    private url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u='f' AND
                 woeid in (select woeid from geo.places(1) where text=\" minneapolis \")&format=json
            `;
    constructor(private http: Http) { }

    getWeather(): Observable<Weather> {
        return this.http
            .get(this.url)
            .map((resp: Response) => this.tranformJson(resp.json()))
            .catch(this.handleError);
    }

    private tranformJson(json): Weather {
        let result: Weather = { high: '', low: '', currentTemp: '', description: '' }
        const r = json.query.results.channel;
        const current = r.item.condition.temp;
        const f = r.item.forecast[0];
        const { high, low, text} = f;
        result['high'] = high;
        result['low'] = low;
        result['description'] = text;
        result['currentTemp'] = current;
        return result;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Service Error');
    }
}