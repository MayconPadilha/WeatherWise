export interface LocalizacaoCidade {
  country: String;
  lat: number;
  lon: number;
  name: String;
  state: String;
}

export interface WeatherTempoAgora {
  id: number;
  name: string;
  sys: { country: string };
  weather: { main: string; description: string; icon: string }[];
  main: {
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
  };
  wind: { speed: number };
  dt: number;
}

export interface WeatherPrevisao {
  dt: number;
  main: Main;
  weather: Weather[];
  dt_txt: string;
}

export interface WeatherPrevisaoTempoDiario {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
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
