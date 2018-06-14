import { Serializable } from '../types';
import { DateOnly } from './dateOnly';
export declare class DateTime implements Serializable {
    static isValisSerialized(value: string): boolean;
    protected date: Date;
    constructor(value: string | Date | DateOnly | DateTime);
    getTime(): number;
    getDate(): Date;
    serialize(): string;
    isEmpty(): boolean;
}
export declare function isDateTime(arg: any): arg is DateTime;
