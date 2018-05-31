import { Serializable } from '../types';
import { DateTime } from './dateTime';
export interface IDateOnlyInitializer {
    year: number;
    month: number;
    day: number;
}
export declare class DateOnly implements Serializable {
    year: number;
    month: number;
    day: number;
    static isValidSerialized(value: string): boolean;
    constructor(value: string | Date | DateOnly | DateTime | IDateOnlyInitializer);
    isEmpty(): boolean;
    serialize(): string;
}
export declare function isDateOnly(arg: any): arg is DateOnly;
