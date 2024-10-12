export interface TempoInterface {
  country: String;
  lat: number;
  lon: number;
  name: String;
  state: String;
}

export interface WeatherDataNow {
  id: number;
  name: string;
  sys: { country: string };
  weather: { main: string; description: string; icon: string }[];
  main: { humidity: number; temp: number; temp_max: number; temp_min: number; feels_like : number };
  wind: { speed: number };
}

// export interface WeatherData {
//   cod: string;
//   message: number;
//   cnt: number;
//   list: WeatherDetails[];
//   city: City;
// }

export interface WeatherDetails {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Sys {
  pod: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}
