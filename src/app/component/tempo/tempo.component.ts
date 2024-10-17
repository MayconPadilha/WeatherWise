import { Component, Input, OnInit } from '@angular/core';
import { TempoService } from '../../service/tempo.service';
import { LocalizacaoCidade, WeatherPrevisao, WeatherPrevisaoTempoDiario, WeatherTempoAgora } from '../../interface/tempo.interface';

@Component({
  selector: 'app-tempo',
  standalone: true,
  imports: [],
  templateUrl: './tempo.component.html',
  styleUrl: './tempo.component.css',
})
export class TempoComponent implements OnInit {
  @Input() pesquisa: string = '';
  localizacaoCidade: LocalizacaoCidade[] = [];

  dadosTempoAgora: WeatherTempoAgora = {
    id: 0,
    name: '',
    sys: { country: '' },
    weather: [{ main: '', description: '', icon: '' }],
    main: { humidity: 0, temp: 0, temp_max: 0, temp_min: 0, feels_like: 0 },
    wind: { speed: 0 },
    dt: 0,
  };

  dadosPrevisao: WeatherPrevisao[] = [];

  dadosPrevisaoTempoDiario: WeatherPrevisaoTempoDiario[] = [];

  constructor(private tempoService: TempoService) {}

  ngOnInit(): void {
    this.buscarEndereco();
  }

  ngOnChanges() {
    if (this.pesquisa) {
      this.buscarEndereco();
    }
  }

  buscarEndereco() {
    this.tempoService.getBuscarDadosEndereco(this.pesquisa).subscribe({
      next: (result) => {
        this.localizacaoCidade = result;
        if (this.localizacaoCidade.length > 0) {
          this.buscarTempoAgora();
          this.buscarTempoPrevisao();
          this.PrevisaoTempoDiario();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  buscarTempoAgora() {
    this.tempoService
      .getBuscarTempoAgora(
        this.localizacaoCidade[0].lat,
        this.localizacaoCidade[0].lon
      )
      .subscribe({
        next: (result) => {
          this.dadosTempoAgora = result;
        },
      });
  }

  buscarTempoPrevisao() {
    this.tempoService
      .getbuscarTempoPrevisao(
        this.localizacaoCidade[0].lat,
        this.localizacaoCidade[0].lon
      )
      .subscribe({
        next: (result) => {
          this.dadosPrevisao = result.list;
        },
      });
  }

  PrevisaoTempoDiario() {
    this.tempoService
      .getPrevisaoTempoDiario(
        this.localizacaoCidade[0].lat,
        this.localizacaoCidade[0].lon
      )
      .subscribe({
        next: (result) => {
          this.dadosPrevisaoTempoDiario = result.list;
        },
      });
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
