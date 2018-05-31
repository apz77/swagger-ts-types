"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duration_1 = require("../types/duration");
describe('Duration', () => {
    it('creates Duration from string PT1M', () => {
        const duration = new duration_1.Duration('PT30M');
        const expected = new duration_1.Duration({ minutes: 30 });
        expect(duration).toEqual(expected);
    });
    it('creates Duration from string PT2H1M10S', () => {
        const duration = new duration_1.Duration('PT2H1M10S');
        const expected = new duration_1.Duration({
            hours: 2,
            minutes: 1,
            seconds: 10,
        });
        expect(duration).toEqual(expected);
    });
    it('creates Duration from string P10WT', () => {
        const duration = new duration_1.Duration('P10WT');
        const expected = new duration_1.Duration({
            weeks: 10,
        });
        expect(duration).toEqual(expected);
    });
    it('creates PT2H1M10S from Duration (serialize)', () => {
        const duration = new duration_1.Duration({ days: 2, hours: 3, minutes: 4 });
        const expected = 'P2DT3H4M';
        expect(duration.serialize()).toEqual(expected);
    });
});
