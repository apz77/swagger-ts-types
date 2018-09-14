"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const baseModel_1 = require("./types/baseModel");
const utils_1 = require("./utils");
var Serializer;
(function (Serializer) {
    /**
     * Serializes known value types
     * @param {ValueTypes} value
     */
    function serializeValue(value, type = null) {
        // Order of "if"s is critical
        if (types_1.isSerializable(value)) {
            return value.serialize();
        }
        // TODO: type === 'object' is special case, until we make recursive metadata
        if (baseModel_1.isModelWithId(value) && type !== 'object') {
            return value.id;
        }
        if (Array.isArray(value)) {
            return value.map(val => serializeValue(val, types_1.isFieldMetadata(type) ? type.subType : null));
        }
        if (value && utils_1.isObject(value)) {
            const serialized = {};
            for (const propName in value) {
                serialized[propName] = serializeValue(value[propName], null);
            }
            return serialized;
        }
        return value;
    }
    Serializer.serializeValue = serializeValue;
})(Serializer = exports.Serializer || (exports.Serializer = {}));
