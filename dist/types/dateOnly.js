"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateTime_1 = require("./dateTime");
const duration_1 = require("./duration");
const misc_1 = require("../misc");
const utils_1 = require("../utils");
class DateOnly {
    static isValidSerialized(value) {
        return !(new DateOnly(value)).isEmpty();
    }
    constructor(value) {
        this.year = 0;
        this.month = 0;
        this.day = 0;
        if (dateTime_1.isDateTime(value)) {
            this.year = value.getDate().getUTCFullYear();
            this.month = value.getDate().getUTCMonth();
            this.day = value.getDate().getUTCDate();
        }
        else if (isDateOnly(value)) {
            this.year = value.year && value.year >= 1970 ? value.year : 0;
            this.month = value.month && value.month < 12 && value.day > 0 ? value.month : 0;
            this.day = value.day && value.day < 31 && value.day > 0 ? value.day : 0;
        }
        else if (typeof value === 'string') {
            // Eg '2017-05-21'
            const values = value.split('-');
            if (values.length === 3) {
                this.year = duration_1.getFloat(values[0]);
                this.month = duration_1.getFloat(values[1]);
                this.day = duration_1.getFloat(values[2]);
            }
        }
    }
    isEmpty() {
        return !this.year || !this.month || !this.day;
    }
    serialize() {
        return `${misc_1.zeroPadNumber(this.year, 4)}-${misc_1.zeroPadNumber(this.month, 2)}-${misc_1.zeroPadNumber(this.day, 2)}`;
    }
}
exports.DateOnly = DateOnly;
function isDateOnly(arg) {
    return utils_1.isObject(arg) && arg.year !== void 0 && arg.month !== void 0 && arg.day !== void 0;
}
exports.isDateOnly = isDateOnly;
