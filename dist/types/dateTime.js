"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateOnly_1 = require("./dateOnly");
class DateTime extends Date {
    static isValisSerialized(value) {
        return !isNaN((new Date(value)).getTime());
    }
    constructor(value) {
        if (isDateTime(value)) {
            super(value.getTime());
        }
        else if (value instanceof Date) {
            super(value.getTime());
        }
        else if (dateOnly_1.isDateOnly(value)) {
            super(value.year, value.month - 1, value.day);
        }
        else if (typeof value === 'string') {
            super(DateTime.isValisSerialized(value) ? value : (new Date(0)).toISOString());
        }
    }
    serialize() {
        return this.isEmpty() ? '' : this.toISOString();
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
