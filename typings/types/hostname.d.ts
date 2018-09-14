import { Serializable } from '../types';
/**
 * Hostname and Email types are really similar, but we won't create a common ancestor,
 * because these types are really basic, and we don't need long prototype inheritace chain here.
 */
export declare class Hostname implements Serializable {
    protected data: string;
    constructor(value: string | Hostname);
    static isValidSerialized(value: string): boolean;
    serialize(): string;
    isEmpty(): boolean;
    toString(): string;
}
