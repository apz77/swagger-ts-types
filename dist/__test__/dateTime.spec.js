"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateTime_1 = require("../types/dateTime");
const dateOnly_1 = require("../types/dateOnly");
describe('DateTime', () => {
    it('creates DateTime from string 2017-05-21T21:58:18Z', () => {
        const result = new dateTime_1.DateTime('2017-05-21T21:58:18Z');
        const expected = new Date('2017-05-21T21:58:18Z');
        expect(result.getDate()).toEqual(expected);
    });
    it('creates DateTime from undefined', () => {
        const result = new dateTime_1.DateTime('');
        expect(result.serialize()).toEqual('');
    });
    it('creates DateTime from "2018-06-14T12:00:16.000Z"', () => {
        const result = new dateTime_1.DateTime('2018-06-14T12:00:16.000Z');
        expect(result.serialize()).toEqual('2018-06-14T12:00:16.000Z');
    });
    it('creates DateTime from Date', () => {
        const expected = new Date('2017-05-21T21:58:18Z');
        const result = new dateTime_1.DateTime(new Date('2017-05-21T21:58:18Z'));
        expect(result.getDate()).toEqual(expected);
    });
    it('creates DateTime from DateOnly', () => {
        const expected = new Date(2017, 4, 21);
        const result = new dateTime_1.DateTime(new dateOnly_1.DateOnly('2017-05-21'));
        expect(result.getDate()).toEqual(expected);
    });
});
