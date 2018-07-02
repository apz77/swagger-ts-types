import { Serializable } from '../types';
import { isString } from '../utils';

// tslint:disable-next-line
const validationRegex = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/;

/**
 * Hostname and Email types are really similar, but we won't create a common ancestor,
 * because these types are really basic, and we don't need long prototype inheritace chain here.
 */
export class Hostname implements Serializable {

  // React-native does not support extending native types, like string and date ((
  protected data: string = '';

  constructor(value: string | Hostname) {
    this.data =  Hostname.isValidSerialized(value.toString()) ? value.toString() : '';
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

  toString(): string {
    return this.data;
  }
}
