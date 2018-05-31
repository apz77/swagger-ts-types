import { Serializable } from '../types';

const validationRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class UUID implements Serializable {
  protected data: string;

  static isValidSerialized(value: string): boolean {
    return value.match(validationRegex) !== null;
  }

  constructor(value: string | UUID) {
    this.data = '';
    if (value instanceof UUID) {
      this.data = value.data;
    } else {
      this.data = UUID.isValidSerialized(value) ? value : '';
    }
  }

  serialize(): string {
    return this.data;
  }

  isEmpty(): boolean {
    return !this.data;
  }

}
