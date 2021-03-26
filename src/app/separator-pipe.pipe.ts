import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separatorPipe'
})
export class SeparatorPipePipe implements PipeTransform {

  transform(value: string): any {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
