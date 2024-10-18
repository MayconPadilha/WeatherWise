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

  formatDateTimeNow(dateTimeStr: number): string {
    return this.tempoService.formatDateTimeNow(dateTimeStr);
  }

  convertTemperature(temp: number): number {
    return this.tempoService.convertTemperature(temp);
  }

  formatDateTime(dateTimeStr: string): string {
    return this.tempoService.formatDateTime(dateTimeStr);
  }

}
