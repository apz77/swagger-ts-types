import { Serializable } from '../types';
export declare class Email implements Serializable {
    protected data: string;
    constructor(value: string | Email);
    static isValidSerialized(value: string): boolean;
    serialize(): string;
    isEmpty(): boolean;
    toString(): string;
}
