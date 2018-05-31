import { Serializable } from '../types';
export declare class Email extends String implements Serializable {
    constructor(value: string | Email);
    static isValidSerialized(value: string): boolean;
    serialize(): string;
    isEmpty(): boolean;
}
