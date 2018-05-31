"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("../misc");
describe('Misc tests', () => {
    it('should call erorr handlers', () => {
        expect(misc_1.zeroPadNumber(1, 2)).toEqual('01');
        expect(misc_1.zeroPadNumber(1, 1)).toEqual('1');
        expect(misc_1.zeroPadNumber(1345234, 10)).toEqual('0001345234');
    });
});
