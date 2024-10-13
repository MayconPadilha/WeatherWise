import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TempoComponent } from "./component/tempo/tempo.component";
import { PesquisaComponent } from "./component/pesquisa/pesquisa.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TempoComponent, PesquisaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pesquisa: string = 'porto alegre';

  atualizarPesquisa(novaPesquisa: string) {
    this.pesquisa = novaPesquisa;
  }
}
