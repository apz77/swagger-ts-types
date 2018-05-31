"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert number to string with zero-leading padding
 * @param {number} value
 * @param {number} pads
 * @return {string}
 */
function zeroPadNumber(value, pads) {
    const s = ('0'.repeat(pads) + String(value));
    return s.substr(s.length - pads);
}
exports.zeroPadNumber = zeroPadNumber;
