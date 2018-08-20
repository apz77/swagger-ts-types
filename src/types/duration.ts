/**
 * Duration type and helpers to validate, normalize, serialize it
 */
/// <reference path="../../.typings/index.d.ts"/>

import { Serializable } from '../types';
import { isObject } from '../utils';
import * as millisecondsToIso8601Duration from 'milliseconds-to-iso-8601-duration';

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

export function isIDurationInitializer(arg: any): arg is IDurationInitializer {
  return isObject(arg) &&
    (arg.years || arg.months || arg.weeks || arg.days || arg.hours || arg.minutes || arg.seconds);
}

export class Duration implements Serializable {
  public years: number = 0;
  public months: number = 0;
  public weeks: number = 0;
  public days: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;

  static isValidSerialized(value: string): boolean {
    return typeof value === 'string';
  }

  /**
   * To create a Duration, use ISO8601 string ('PT1M'), object like {minutes: 1, seconds: 2}, or another Duration object
   * @param {string | Duration | IDurationInitializer} value
   */
  constructor(value?: string | Duration | IDurationInitializer) {
    if (value) {
      if (typeof value === 'string') {
        // Stolen rom https://github.com/tolu/ISO8601-duration/
        // PnYnMnDTnHnMnS
        const numbers = '\\d+(?:[\\.,]\\d{0,3})?';
        const weekPattern = '(' + numbers + 'W)';
        const datePattern = '(' + numbers + 'Y)?(' + numbers + 'M)?(' + numbers + 'D)?';
        const timePattern = 'T(' + numbers + 'H)?(' + numbers + 'M)?(' + numbers + 'S)?';

        const iso8601 = 'P(?:' + weekPattern + '|' + datePattern + '(?:' + timePattern + ')?)';
        const pattern = new RegExp(iso8601);
        // const objMap = ['weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds'];

        const mathes = value.match(pattern);
        if (mathes) {
          this.weeks = getFloat(mathes[1]);
          this.years = getFloat(mathes[2]);
          this.months = getFloat(mathes[3]);
          this.days = getFloat(mathes[4]);
          this.hours = getFloat(mathes[5]);
          this.minutes = getFloat(mathes[6]);
          this.seconds = getFloat(mathes[7]);
        }
      } else if (value instanceof Duration || isIDurationInitializer(value)) {
        this.years = getFloat(value.years);
        this.months = getFloat(value.months);
        this.weeks = getFloat(value.weeks);
        this.days = getFloat(value.days);
        this.hours = getFloat(value.hours);
        this.minutes = getFloat(value.minutes);
        this.seconds = getFloat(value.seconds);
      }
    }
  }

  public isEmpty(): boolean {
    return !this.years && !this.months && !this.weeks && !this.days && !this.hours && !this.minutes && !this.seconds;
  }

  /**
   * Return amount of seconds for interval
   * NOTE: does not work for durations of month and more (months and years are start date dependant)
   * @return {number}
   */
  public getMS(): number {
    const { days, hours, minutes, seconds } = this;
    // TODO for weeks, years, months
    return (seconds + minutes * 60 + hours * 60 * 60 + days * 24 * 60 * 60) * 1000;
  }

  /**
   * Serialize into ISO 8601 string
   * @return {string}
   */
  public serialize(): string {
    return millisecondsToIso8601Duration.iso8601duration(this.getMS());
  }

  /**
   * @deprecated move to i18n
   * @return {string}
   */
  public format(): string {
    const cast = (this as any) as IDurationInitializer;
    return ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']
      .map((key: string) => {
        const value = cast[key];
        return value && value > 0 ? `${value} ${value > 1 ? key : key.slice(0, -1)}` : '';
      })
      .filter((item: string) => !!item)
      .join(' ');
  }
}

export function getFloat(a: any) {
  const parsed = parseFloat(a);
  return isNaN(parsed) || !isFinite(parsed) ? 0 : parsed;
}
