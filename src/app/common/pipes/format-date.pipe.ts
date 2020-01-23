import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from '@angular/core/src/render3/pipe';
import * as moment from 'moment';

@Pipe({
  name: 'fortmatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string {
    return moment(value).format('Y/MM/DD');
  }
}
