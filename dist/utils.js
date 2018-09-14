"use strict";
// Miscellaneous functions and typeguards
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(value) {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}
exports.isObject = isObject;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isString(value) {
    return typeof value === 'string' || (isObject(value) && Object.prototype.toString.call(value) === '[object String]');
}
exports.isString = isString;
function isFunction(value) {
    const tag = Object.prototype.toString.call(value);
    return isObject(value) &&
        (tag === '[object AsyncFunction]' || tag === '[object Function]' || tag === '[object GeneratorFunction]');
}
exports.isFunction = isFunction;
