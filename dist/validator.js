"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const uuid_1 = require("./types/uuid");
const email_1 = require("./types/email");
const hostname_1 = require("./types/hostname");
const duration_1 = require("./types/duration");
const dateTime_1 = require("./types/dateTime");
const dateOnly_1 = require("./types/dateOnly");
const utils_1 = require("./utils");
var Validator;
(function (Validator) {
    const validatorsMap = {
        null: (value) => value === null,
        string: (value) => typeof value === 'string',
        UUID: (value) => uuid_1.UUID.isValidSerialized(value),
        Email: (value) => email_1.Email.isValidSerialized(value),
        Hostname: (value) => hostname_1.Hostname.isValidSerialized(value),
        Duration: (value) => duration_1.Duration.isValidSerialized(value),
        DateTime: (value) => dateTime_1.DateTime.isValisSerialized(value),
        DateOnly: (value) => dateOnly_1.DateOnly.isValidSerialized(value),
        number: (value) => typeof value === 'number',
        boolean: (value) => typeof value === 'boolean',
        Permit: (value) => value in types_1.Permit,
        FolderType: (value) => value in types_1.FolderType,
        InvitationStatus: (value) => value in types_1.InvitationStatus,
        JSON: (value) => {
            if (utils_1.isObject(value)) {
                return true;
            }
            try {
                JSON.parse(value);
            }
            catch (e) {
                return false;
            }
            return true;
        },
        ModelType: (value) => (typeof value === 'string') && !!value,
        ModelId: (value) => (typeof value === 'string') && !!value,
        Blob: (value) => true,
        array: (value) => Array.isArray(value),
        object: (value) => utils_1.isObject(value),
        enum: (value) => (typeof value === 'string') && !!value,
        link: (value) => (typeof value === 'string') && !!value,
    };
    function getValidator(type, value) {
        if (validatorsMap[type]) {
            return validatorsMap[type];
        }
        if (utils_1.isObject(value)) {
            return validatorsMap['object'];
        }
    }
    /**
     * Check, whether value is valid, according to it's metadata
     * @param value
     * @return {boolean}
     */
    function isValidValue(value, types) {
        for (const type of types) {
            const validator = getValidator(type, value);
            return validator && validator(value);
        }
        return false;
    }
    Validator.isValidValue = isValidValue;
})(Validator = exports.Validator || (exports.Validator = {}));
