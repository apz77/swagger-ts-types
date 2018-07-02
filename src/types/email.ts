import { Serializable } from '../types';
import { isEmail } from 'validator';

export class Email implements Serializable {

  // React-native does not support extending native types, like string and date ((
  protected data: string = '';

  constructor(value: string | Email) {
    this.data = Email.isValidSerialized(value.toString()) ? value.toString() : '';
  }

  static isValidSerialized(value: string): boolean {
    return isEmail(value);
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
