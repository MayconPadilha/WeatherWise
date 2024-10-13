import { Component, Input, OnInit } from '@angular/core';
import { TempoService } from '../../service/tempo.service';
import { TempoDiario, TempoInterface, WeatherDataNow, WeatherDetails } from '../../interface/tempo.interface';
import { HorarioPipe } from '../../pipes/horario.pipe';

@Component({
  selector: 'app-tempo',
  standalone: true,
  imports: [HorarioPipe],
  templateUrl: './tempo.component.html',
  styleUrl: './tempo.component.css',
})
export class TempoComponent implements OnInit {
  @Input() pesquisa: string = '';
  tempoList: TempoInterface[] = [];
  dadosAgora: WeatherDataNow = {
    id: 0,
    name: '',
    sys: { country: '' },
    weather: [{ main: '', description: '', icon: '' }],
    main: { humidity: 0, temp: 0, temp_max: 0, temp_min: 0, feels_like: 0 },
    wind: { speed: 0 },
    dt: 0,
  };
  dadosPrevisao: WeatherDetails[] = [];

  dadosPrevisaoTempoDiario: TempoDiario[] = [];

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
        this.tempoList = result;
        if (this.tempoList.length > 0) {
          this.buscarTempoAgora();
          this.buscarTempo();
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
      .getBuscarTempoAgora(this.tempoList[0].lat, this.tempoList[0].lon)
      .subscribe({
        next: (result) => {
          this.dadosAgora = result;
          console.log(result);
        },
      });
  }

  buscarTempo() {
    this.tempoService
      .getPrevisaoTempo(this.tempoList[0].lat, this.tempoList[0].lon)
      .subscribe({
        next: (result) => {
          this.dadosPrevisao = result.list;
          // console.log(this.dadosPrevisao);
        },
      });
  }

  PrevisaoTempoDiario() {
    this.tempoService
      .getPrevisaoTempoDiario(this.tempoList[0].lat, this.tempoList[0].lon)
      .subscribe({
        next: (result) => {
          this.dadosPrevisaoTempoDiario = result.list;
          // console.log(this.dadosPrevisaoTempoDiario);
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
    return date.toLocaleDateString('pt-BR', { day: 'numeric', weekday: 'short' , month: 'short' });
  }
}
