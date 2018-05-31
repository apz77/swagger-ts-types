import { Serializable } from '../types';
import { isString } from '../utils';

// tslint:disable-next-line
const validationRegex = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/;

export class Hostname extends String implements Serializable {

  constructor(value: string | Hostname) {
    super(Hostname.isValidSerialized(value.toString()) ? value : '');
  }

  static isValidSerialized(value: string): boolean {
    return isString(value) && validationRegex.test(value);
  }

  serialize(): string {
    return this.toString();
  }

  isEmpty(): boolean {
    return !this.toString();
  }

}
