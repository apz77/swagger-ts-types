import { Serializable } from '../types';
export declare class UUID implements Serializable {
    protected data: string;
    static isValidSerialized(value: string): boolean;
    constructor(value: string | UUID);
    serialize(): string;
    isEmpty(): boolean;
}
