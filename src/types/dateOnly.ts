import { Serializable } from '../types';
import { DateTime, isDateTime } from './dateTime';
import { getFloat } from './duration';
import { zeroPadNumber } from '../misc';
import { isObject } from '../utils';

export interface IDateOnlyInitializer {
  year: number;
  month: number;
  day: number;
}

export class DateOnly implements Serializable {

  public year: number;
  public month: number;
  public day: number;

  static isValidSerialized(value: string): boolean {
    return !(new DateOnly(value)).isEmpty();
  }

  constructor(value: string | Date | DateOnly | DateTime | IDateOnlyInitializer) {
    this.year = 0;
    this.month = 0;
    this.day = 0;

    if (isDateTime(value)) {
      this.year = value.getDate().getUTCFullYear();
      this.month = value.getDate().getUTCMonth();
      this.day = value.getDate().getUTCDate();
    } else if (isDateOnly(value)) {
      this.year = value.year && value.year >= 1970 ? value.year : 0;
      this.month = value.month && value.month < 12 && value.day > 0 ? value.month : 0;
      this.day = value.day  && value.day < 31 && value.day > 0 ? value.day : 0;
    } else if (typeof value === 'string') {
      // Eg '2017-05-21'
      const values = value.split('-');
      if (values.length === 3) {
        this.year = getFloat(values[0]);
        this.month = getFloat(values[1]);
        this.day = getFloat(values[2]);
      }
    }
  }

  public isEmpty(): boolean {
    return !this.year || !this.month || !this.day;
  }

  public serialize(): string {
    return `${zeroPadNumber(this.year, 4)}-${zeroPadNumber(this.month, 2)}-${zeroPadNumber(this.day, 2)}`;
  }
}

export function isDateOnly(arg: any): arg is DateOnly {
  return isObject(arg) && arg.year !== void 0 && arg.month !== void 0 && arg.day !== void 0;
}
