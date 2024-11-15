import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Constants } from '../util/constants';

@Pipe({
  name: 'DateFormatPipe'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
   // return super.transform(value, Constants.DATE_TIME_FMT);
    const dateMoment: moment.Moment = moment(value, 'DD/MM/YYYY hh:mm:ss');

    const dateJS: Date = dateMoment.toDate();

    return super.transform(dateJS, Constants.DATE_TIME_FMT);
  }

}
