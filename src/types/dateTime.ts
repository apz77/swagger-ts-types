import { Serializable } from '../types';
import { DateOnly, isDateOnly } from './dateOnly';

export class DateTime implements Serializable {

  static isValisSerialized(value: string): boolean {
    return !isNaN((new Date(value)).getTime());
  }

  protected date: Date = new Date(0);

  constructor(value: string | Date | DateOnly | DateTime) {
    if (isDateTime(value)) {
      this.date = new Date(value.getTime());
    } else if (value instanceof Date) {
      this.date = new Date(value.getTime());
    } else if (isDateOnly(value)) {
      this.date = new Date(value.year, value.month - 1, value.day);
    } else if (typeof value === 'string') {
      this.date = new Date(DateTime.isValisSerialized(value) ? value : (new Date(0)).toISOString());
    }
  }

  public getTime() {
    return this.date.getTime();
  }

  public getDate() {
    return this.date;
  }

  public serialize(): string {
    return this.isEmpty() ? '' : this.date.toISOString();
  }

  public isEmpty(): boolean {
    let time = 0;
    try {
      time = this.getTime();
    } catch {}
    return time === 0 || isNaN(time);
  }
}

export function isDateTime(arg: any): arg is DateTime {
  return arg instanceof DateTime;
}
