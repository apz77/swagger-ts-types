"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("validator");
class Email extends String {
    constructor(value) {
        super(Email.isValidSerialized(value.toString()) ? value : '');
    }
    static isValidSerialized(value) {
        return validator_1.isEmail(value);
    }
    serialize() {
        return this.toString();
    }
    isEmpty() {
        return !this.toString();
    }
}
exports.Email = Email;
