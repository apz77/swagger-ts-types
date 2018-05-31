"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateOnly_1 = require("../types/dateOnly");
describe('DateOnly ', () => {
    it('creates DateOnly from string 2017-05-21', () => {
        const result = new dateOnly_1.DateOnly('2017-05-21');
        const expected = new dateOnly_1.DateOnly({ year: 2017, month: 5, day: 21 });
        expect(result).toEqual(expected);
    });
});
