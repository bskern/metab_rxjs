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
            .map((resp: Response) => resp.json())
            .pluck('query','results','channel')
            .map(this.transform)
            .catch(this.handleError);
    }

    private transform({item: {forecast, condition}}): Weather {
        const [{high, low, text}] = forecast;
        return {
            currentTemp: condition.temp,
            high,
            low,
            description: text
        }
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Service Error');
    }
}