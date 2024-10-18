import { Component, Input, OnInit } from '@angular/core';
import { LocalizacaoCidade, WeatherPrevisaoTempoDiario } from '../../interface/tempo.interface';
import { TempoService } from '../../service/tempo.service';

@Component({
  selector: 'app-previsao-semanal',
  standalone: true,
  imports: [],
  templateUrl: './previsao-semanal.component.html',
  styleUrl: './previsao-semanal.component.css',
})
export class PrevisaoSemanalComponent implements OnInit {
  @Input() pesquisa: string = '';
  localizacaoCidade: LocalizacaoCidade[] = [];

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
          this.PrevisaoTempoDiario();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  PrevisaoTempoDiario() {
    this.tempoService
      .getPrevisaoTempoDiario(this.localizacaoCidade[0].lat, this.localizacaoCidade[0].lon)
      .subscribe({
        next: (result) => {
          this.dadosPrevisaoTempoDiario = result.list;
        },
      });
  }

  convertTemperature(temp: number): number {
    return this.tempoService.convertTemperature(temp);
  }

  getFormattedDate(timestamp: number): string {
    return this.tempoService.getFormattedDate(timestamp);
  }
}
