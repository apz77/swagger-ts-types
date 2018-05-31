"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// tslint:disable-next-line
const validationRegex = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/;
class Hostname extends String {
    constructor(value) {
        super(Hostname.isValidSerialized(value.toString()) ? value : '');
    }
    static isValidSerialized(value) {
        return utils_1.isString(value) && validationRegex.test(value);
    }
    serialize() {
        return this.toString();
    }
    isEmpty() {
        return !this.toString();
    }
}
exports.Hostname = Hostname;
