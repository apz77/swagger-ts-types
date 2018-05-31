"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
class UUID {
    static isValidSerialized(value) {
        return value.match(validationRegex) !== null;
    }
    constructor(value) {
        this.data = '';
        if (value instanceof UUID) {
            this.data = value.data;
        }
        else {
            this.data = UUID.isValidSerialized(value) ? value : '';
        }
    }
    serialize() {
        return this.data;
    }
    isEmpty() {
        return !this.data;
    }
}
exports.UUID = UUID;
