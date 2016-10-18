import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './weather';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit, OnDestroy {

    weather: Observable<Weather>;
    weatherSub: Subscription;

    constructor(private weatherService: WeatherService) { }

    ngOnInit() {
        this.weather = this.weatherService.getWeather();
    }

    ngOnDestroy() {
        this.weatherSub.unsubscribe();
    }
}