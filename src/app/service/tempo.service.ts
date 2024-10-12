import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TempoService {
  API_KEY: string = '45f8d6a48ac2279c8954243037bb47b8';

  constructor(private httpClient: HttpClient) {}

  getBuscarDadosEndereco(lugar: string): Observable<any> {
    const API_URL: string =
      'https://api.openweathermap.org/geo/1.0/direct?q=' +
      encodeURI(lugar) +
      '&appid=' +
      this.API_KEY
    return this.httpClient.get(API_URL).pipe((res) => res);
  }

  getBuscarTempoAgora(lat: number, lon: number): Observable<any> {
    const API_URL: string =
      'https://api.openweathermap.org/data/2.5/weather?' +
      'lat=' +
      lat +
      '&lon=' +
      lon +
      '&appid=' +
      this.API_KEY +
      '&units=metric&lang=pt_br';

    return this.httpClient.get(API_URL).pipe((res) => res);
  }

  getPrevisaoTempo(lat: number, lon: number): Observable<any> {
    const API_URL: string =
      'https://api.openweathermap.org/data/2.5/forecast?' +
      'lat=' +
      lat +
      '&lon=' +
      lon +
      '&appid=' +
      this.API_KEY +
      '&units=metric&lang=pt_br&cnt=7';
    return this.httpClient.get(API_URL).pipe((res) => res);
  }
}
