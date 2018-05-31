import { Serializable } from '../types';
import { DateOnly, isDateOnly } from './dateOnly';

export class DateTime extends Date implements Serializable {

  static isValisSerialized(value: string): boolean {
    return !isNaN((new Date(value)).getTime());
  }

  constructor(value: string | Date | DateOnly | DateTime) {
    if (isDateTime(value)) {
      super(value.getTime());
    } else if (value instanceof Date) {
      super(value.getTime());
    } else if (isDateOnly(value)) {
      super(value.year, value.month - 1, value.day);
    } else if (typeof value === 'string') {
      super(DateTime.isValisSerialized(value) ? value : (new Date(0)).toISOString());
    }
  }

  public serialize(): string {
    return this.isEmpty() ? '' : this.toISOString();
  }

  public isEmpty(): boolean {
    const time = this.getTime();
    return time === 0 || isNaN(time);
  }
}

export function isDateTime(arg: any): arg is DateTime {
  return arg instanceof DateTime;
}
