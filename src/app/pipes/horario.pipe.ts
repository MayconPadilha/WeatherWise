import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horario',
  standalone: true
})
export class HorarioPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const date: Date = new Date(value);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

}
