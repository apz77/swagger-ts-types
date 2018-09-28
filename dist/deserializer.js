"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const duration_1 = require("./types/duration");
const dateTime_1 = require("./types/dateTime");
const email_1 = require("./types/email");
const uuid_1 = require("./types/uuid");
const hostname_1 = require("./types/hostname");
const dateOnly_1 = require("./types/dateOnly");
const validator_1 = require("./validator");
const utils_1 = require("./utils");
class DeserializeResult {
    constructor(value, errors) {
        this.value = value;
        this.errors = [];
        if (Array.isArray(errors)) {
            this.errors = errors;
        }
        else if (errors) {
            this.errors.push(errors);
        }
    }
    mergeErrors(value) {
        this.errors = this.errors.concat(value.errors);
    }
    isOk() {
        return this.value !== void 0 && this.errors.length === 0;
    }
    getErrors() {
        return this.errors;
    }
    getValue() {
        return this.value;
    }
}
exports.DeserializeResult = DeserializeResult;
var Deserializer;
(function (Deserializer) {
    const denormalizersMap = {
        UUID: (value) => new DeserializeResult(new uuid_1.UUID(value)),
        Email: (value) => new DeserializeResult(new email_1.Email(value)),
        Hostname: (value) => new DeserializeResult(new hostname_1.Hostname(value)),
        Duration: (value) => new DeserializeResult(new duration_1.Duration(value)),
        DateTime: (value) => new DeserializeResult(new dateTime_1.DateTime(value)),
        DateOnly: (value) => new DeserializeResult(new dateOnly_1.DateOnly(value)),
        null: (value) => new DeserializeResult(value),
        string: (value) => new DeserializeResult(value),
        number: (value) => new DeserializeResult(value),
        boolean: (value) => new DeserializeResult(value),
        Permit: (value) => new DeserializeResult(types_1.Permit[value]),
        FolderType: (value) => new DeserializeResult(types_1.FolderType[value]),
        InvitationStatus: (value) => new DeserializeResult(types_1.InvitationStatus[value]),
        JSON: (value) => new DeserializeResult(value),
        ModelType: (value) => new DeserializeResult(value),
        ModelId: (value) => new DeserializeResult(value),
        Blob: (value) => new DeserializeResult(value),
        enum: (value) => new DeserializeResult(value),
        object: (value) => new DeserializeResult(value),
        array: denormalizeArray,
        link: denormalizeLink,
    };
    function getDenormalizer(type, value) {
        if (denormalizersMap[type]) {
            return denormalizersMap[type];
        }
        if (utils_1.isObject(value)) {
            return denormalizersMap['object'];
        }
        return void 0;
    }
    function denormalizeRawModel(rawModel, metadata, getModel, isKnownModelType) {
        const model = {};
        const result = new DeserializeResult(model);
        if (utils_1.isObject(rawModel)) {
            for (const fieldName in metadata.fields) {
                const fieldMetadata = metadata.fields[fieldName];
                const value = rawModel[fieldMetadata.apiField];
                if (fieldMetadata.isRequired || value !== void 0) {
                    const denormalizeResult = Deserializer.denormalizeProp(value, fieldMetadata, getModel, isKnownModelType);
                    model[fieldMetadata.name] = denormalizeResult.getValue();
                    result.mergeErrors(denormalizeResult);
                }
            }
        }
        else {
            return new DeserializeResult(void 0, `Raw model is not an object: ${rawModel}`);
        }
        return result;
    }
    Deserializer.denormalizeRawModel = denormalizeRawModel;
    function denormalizeProp(value, fieldMetadata, getModel, isKnownModelType) {
        if (fieldMetadata.isRequired && value === void 0) {
            return new DeserializeResult(value, `Required field ${fieldMetadata.apiField} is undefined.`);
        }
        for (const type of fieldMetadata.types) {
            if (validator_1.Validator.isValidValue(value, [type])) {
                const denormalizer = getDenormalizer(type, value);
                if (denormalizer) {
                    return denormalizer(value, fieldMetadata, getModel, isKnownModelType);
                }
                return new DeserializeResult(void 0, `No denormalizer for ${type} found` +
                    `of ${JSON.stringify(value)} for field ${JSON.stringify(fieldMetadata)} `);
            }
        }
        return new DeserializeResult(void 0, `Bad type or value ${JSON.stringify(fieldMetadata.types)} ` +
            `of ${JSON.stringify(value)} for field ${JSON.stringify(fieldMetadata)} `);
    }
    Deserializer.denormalizeProp = denormalizeProp;
    function denormalizeArray(value, fieldMetadata, getModel, isKnownModelType) {
        const result = [];
        const errors = [];
        let { subType } = fieldMetadata;
        for (const item of value) {
            let denormalizer = getDenormalizer(subType, item);
            // Special case for links
            if (!denormalizer && utils_1.isString(fieldMetadata.subType)) {
                denormalizer = denormalizeLink;
                subType = 'link';
            }
            if (denormalizer) {
                const isValid = validator_1.Validator.isValidValue(item, [subType]);
                if (isValid) {
                    const denormalizerResult = denormalizer(item, fieldMetadata, getModel, isKnownModelType);
                    if (denormalizerResult.isOk()) {
                        result.push(denormalizerResult.getValue());
                    }
                    else {
                        errors.push(...denormalizerResult.getErrors());
                    }
                }
                else {
                    errors.push(`Invalid value ${JSON.stringify(item)} for subType ${fieldMetadata.subType}.`);
                }
            }
            else {
                errors.push(`No mormalizer found for subType ${fieldMetadata.subType}.`);
                result.push(item);
            }
        }
        return new DeserializeResult(result, errors);
    }
    Deserializer.denormalizeArray = denormalizeArray;
    function denormalizeLink(value, fieldMetadata, getModel, isKnownModelType) {
        if (isKnownModelType(fieldMetadata.subType)) {
            return new DeserializeResult(getModel(fieldMetadata.subType, value));
        }
        return new DeserializeResult(void 0, `Unknown ModelType ${fieldMetadata.subType}`);
    }
    Deserializer.denormalizeLink = denormalizeLink;
})(Deserializer = exports.Deserializer || (exports.Deserializer = {}));
