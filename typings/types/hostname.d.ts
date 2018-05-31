import { Serializable } from '../types';
export declare class Hostname extends String implements Serializable {
    constructor(value: string | Hostname);
    static isValidSerialized(value: string): boolean;
    serialize(): string;
    isEmpty(): boolean;
}
