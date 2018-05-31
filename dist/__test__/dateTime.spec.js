"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateTime_1 = require("../types/dateTime");
const dateOnly_1 = require("../types/dateOnly");
describe('DateTime', () => {
    it('creates DateTime from string 2017-05-21T21:58:18Z', () => {
        const result = new dateTime_1.DateTime('2017-05-21T21:58:18Z');
        const expected = new Date('2017-05-21T21:58:18Z');
        expect(result).toEqual(expected);
    });
    it('creates DateTime from Date', () => {
        const expected = new Date('2017-05-21T21:58:18Z');
        const result = new dateTime_1.DateTime(new Date('2017-05-21T21:58:18Z'));
        expect(result).toEqual(expected);
    });
    it('creates DateTime from DateOnly', () => {
        const expected = new Date(2017, 4, 21);
        const result = new dateTime_1.DateTime(new dateOnly_1.DateOnly('2017-05-21'));
        expect(result).toEqual(expected);
    });
});
