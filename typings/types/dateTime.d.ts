import { Serializable } from '../types';
import { DateOnly } from './dateOnly';
export declare class DateTime extends Date implements Serializable {
    static isValisSerialized(value: string): boolean;
    constructor(value: string | Date | DateOnly | DateTime);
    serialize(): string;
    isEmpty(): boolean;
}
export declare function isDateTime(arg: any): arg is DateTime;
