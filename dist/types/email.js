"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEmail = require("validator/lib/isEmail");
class Email {
    constructor(value) {
        // React-native does not support extending native types, like string and date ((
        this.data = '';
        this.data = Email.isValidSerialized(value.toString()) ? value.toString() : '';
    }
    static isValidSerialized(value) {
        return isEmail(value);
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
exports.Email = Email;
