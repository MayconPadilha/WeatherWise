import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TempoComponent } from "./component/tempo/tempo.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TempoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
