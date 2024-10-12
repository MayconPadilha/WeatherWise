import { Component, OnInit } from '@angular/core';
import { TempoService } from '../../service/tempo.service';
import { TempoInterface, WeatherDataNow, WeatherDetails } from '../../interface/tempo.interface';
import { FormsModule } from '@angular/forms';
import { HorarioPipe } from '../../pipes/horario.pipe';

@Component({
  selector: 'app-tempo',
  standalone: true,
  imports: [FormsModule, HorarioPipe],
  templateUrl: './tempo.component.html',
  styleUrl: './tempo.component.css',
})
export class TempoComponent implements OnInit {
  tempoList: TempoInterface[] = [];

  dadosAgora: WeatherDataNow = {
    id: 0,
    name: '',
    sys: { country: '' },
    weather: [{ main: '', description: '', icon: '' }],
    main: { humidity: 0, temp: 0, temp_max: 0, temp_min: 0, feels_like: 0 },
    wind: { speed: 0 },
  };
  dadosPrevisao: WeatherDetails[] = [];

  constructor(private tempoService: TempoService) {}

  ngOnInit(): void {
    this.buscarEndereco();
    // throw new Error('Method not implemented.');
  }

  pesquisa: string = 'porto alegre';

  buscarEndereco() {
    this.tempoService.getBuscarDadosEndereco(this.pesquisa).subscribe({
      next: (result) => {
        this.tempoList = result;

        if (this.tempoList.length > 0) {
          this.buscarTempoAgora();
          this.buscarTempo();
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
          console.log(this.dadosAgora);
        },
      });
  }

  buscarTempo() {
    this.tempoService
      .getPrevisaoTempo(this.tempoList[0].lat, this.tempoList[0].lon)
      .subscribe({
        next: (result) => {
          this.dadosPrevisao = result.list;
          console.log(this.dadosPrevisao);
        },
      });
  }
}
