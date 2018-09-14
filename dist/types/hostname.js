"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// tslint:disable-next-line
const validationRegex = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/;
/**
 * Hostname and Email types are really similar, but we won't create a common ancestor,
 * because these types are really basic, and we don't need long prototype inheritace chain here.
 */
class Hostname {
    constructor(value) {
        // React-native does not support extending native types, like string and date ((
        this.data = '';
        this.data = Hostname.isValidSerialized(value.toString()) ? value.toString() : '';
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
    toString() {
        return this.data;
    }
}
exports.Hostname = Hostname;
