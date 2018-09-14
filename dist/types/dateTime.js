"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateOnly_1 = require("./dateOnly");
class DateTime {
    constructor(value) {
        this.date = new Date(0);
        if (isDateTime(value)) {
            this.date = new Date(value.getTime());
        }
        else if (value instanceof Date) {
            this.date = new Date(value.getTime());
        }
        else if (dateOnly_1.isDateOnly(value)) {
            this.date = new Date(value.year, value.month - 1, value.day);
        }
        else if (typeof value === 'string') {
            this.date = new Date(DateTime.isValisSerialized(value) ? value : (new Date(0)).toISOString());
        }
    }
    static isValisSerialized(value) {
        return !isNaN((new Date(value)).getTime());
    }
    getTime() {
        return this.date.getTime();
    }
    getDate() {
        return this.date;
    }
    serialize() {
        return this.isEmpty() ? '' : this.date.toISOString();
    }
    isEmpty() {
        let time = 0;
        try {
            time = this.getTime();
        }
        catch (_a) { }
        return time === 0 || isNaN(time);
    }
}
exports.DateTime = DateTime;
function isDateTime(arg) {
    return arg instanceof DateTime;
}
exports.isDateTime = isDateTime;
