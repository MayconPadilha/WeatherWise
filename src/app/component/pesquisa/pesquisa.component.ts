import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css',
})
export class PesquisaComponent {
  pesquisa: string = '';
  @Output() pesquisaEmitida: EventEmitter<string> = new EventEmitter();

  buscarEndereco() {
    this.pesquisaEmitida.emit(this.pesquisa);
    // console.log(this.pesquisa);
  }
}
