/**
 * Duration type and helpers to validate, normalize, serialize it
 */
/// <reference path="../../.typings/index.d.ts" />
import { Serializable } from '../types';
export interface IDurationInitializer {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    [key: string]: number | undefined;
}
export declare function isIDurationInitializer(arg: any): arg is IDurationInitializer;
export declare class Duration implements Serializable {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    static isValidSerialized(value: string): boolean;
    /**
     * To create a Duration, use ISO8601 string ('PT1M'), object like {minutes: 1, seconds: 2}, or another Duration object
     * @param {string | Duration | IDurationInitializer} value
     */
    constructor(value?: string | Duration | IDurationInitializer);
    isEmpty(): boolean;
    /**
     * Return amount of seconds for interval
     * NOTE: does not work for durations of month and more (months and years are start date dependant)
     * @return {number}
     */
    getMS(): number;
    /**
     * Serialize into ISO 8601 string
     * @return {string}
     */
    serialize(): string;
    /**
     * @deprecated move to i18n
     * @return {string}
     */
    format(): string;
}
export declare function getFloat(a: any): number;
