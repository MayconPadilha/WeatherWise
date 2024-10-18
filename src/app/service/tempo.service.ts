import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TempoService {
  private API_KEY: string = '45f8d6a48ac2279c8954243037bb47b8';
  private API_KEY2: string = '5796abbde9106b7da4febfae8c44c232'; //chave API do OpenWeatherMap utilizada para fazer o consumo dos dados daily

  constructor(private httpClient: HttpClient) {}

  getBuscarDadosEndereco(lugar: string): Observable<any> {
    const API_URL: string =
      'https://api.openweathermap.org/geo/1.0/direct?q=' +
      encodeURI(lugar) +
      '&appid=' +
      this.API_KEY;
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

  getbuscarTempoPrevisao(lat: number, lon: number): Observable<any> {
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

  getPrevisaoTempoDiario(lat: number, lon: number): Observable<any> {
    const API_URL: string =
      'https://api.openweathermap.org/data/2.5/forecast/daily?' +
      'lat=' +
      lat +
      '&lon=' +
      lon +
      '&appid=' +
      this.API_KEY2 +
      '&units=metric&lang=pt_br&cnt=7';
    return this.httpClient.get(API_URL).pipe((res) => res);
  }

  formatDateTimeNow(dateTimeStr: number): string {
    const date = new Date(dateTimeStr * 1000);
    const formattedDate = date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return formattedDate;
  }

  convertTemperature(temp: number): number {
    return Math.round(temp);
  }

  formatDateTime(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleString('pt-BR', options);
  }

  getFormattedDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      weekday: 'short',
      month: 'short',
    });
  }
}
