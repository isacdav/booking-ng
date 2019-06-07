import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from '@angular/core/src/render3/pipe';

@Pipe({
    name: 'upper'
})
export class UpperCasePipe implements PipeTransform {
    transform(value: string): string {
        return value.toUpperCase();
    }
}