import { Serializable } from '../types';
import { isEmail } from 'validator';

export class Email extends String implements Serializable {

  constructor(value: string | Email) {
    super(Email.isValidSerialized(value.toString()) ? value : '');
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

}
