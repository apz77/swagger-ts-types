"use strict";
// BaseModel, UUID, Email, Hostname, DateTime, DateOnly, Duration, Permit, API_URL, setParams */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const serializer_1 = require("./serializer");
function isSerializable(arg) {
    return utils_1.isObject(arg) && utils_1.isFunction(arg.serialize) && utils_1.isFunction(arg.isEmpty);
}
exports.isSerializable = isSerializable;
function setParams(url, params, metadata) {
    const { fields } = metadata;
    let result = url;
    for (const fieldName in fields) {
        result = result.replace(`{${fields[fieldName].apiField}}`, serializer_1.Serializer.serializeValue(params[fieldName]));
    }
    return result;
}
exports.setParams = setParams;
/**
 * Serializes request models to send to API, substituting field names with real API field names
 * @param {BaseModel} value
 * @param {ModelMetadata[]} metadata
 * @return {string}
 */
function serialize(value, metadata) {
    const result = {};
    function getFieldOfMetadata(fieldName, metadata) {
        for (const modelMetadata of metadata) {
            for (const mFieldName in modelMetadata.fields) {
                if (fieldName === mFieldName) {
                    return modelMetadata.fields[fieldName];
                }
            }
        }
        return null;
    }
    for (const fieldName in value) {
        const fieldMetadata = getFieldOfMetadata(fieldName, metadata);
        if (fieldMetadata) {
            result[fieldMetadata.apiField] = serializer_1.Serializer.serializeValue(value[fieldName]);
        }
        else {
            result[fieldName] = serializer_1.Serializer.serializeValue(value[fieldName]);
        }
    }
    return JSON.stringify(result);
}
exports.serialize = serialize;
var Permit;
(function (Permit) {
    Permit[Permit["CREATE"] = 1] = "CREATE";
    Permit[Permit["READ"] = 2] = "READ";
    Permit[Permit["UPDATE"] = 4] = "UPDATE";
    Permit[Permit["DELETE"] = 8] = "DELETE";
    Permit[Permit["CRUD"] = 15] = "CRUD";
})(Permit = exports.Permit || (exports.Permit = {}));
var FolderType;
(function (FolderType) {
    FolderType[FolderType["LoginFolder"] = 1] = "LoginFolder";
    FolderType[FolderType["FileFolder"] = 2] = "FileFolder";
})(FolderType = exports.FolderType || (exports.FolderType = {}));
var InvitationStatus;
(function (InvitationStatus) {
    InvitationStatus[InvitationStatus["Pending"] = 1] = "Pending";
    InvitationStatus[InvitationStatus["Accepted"] = 2] = "Accepted";
})(InvitationStatus = exports.InvitationStatus || (exports.InvitationStatus = {}));
function isFieldMetadata(arg) {
    return utils_1.isObject(arg) && arg.name && Array.isArray(arg.types) && arg.types.length > 0 && arg.subType && arg.apiField;
}
exports.isFieldMetadata = isFieldMetadata;
function isModelMetadata(arg) {
    return utils_1.isObject(arg) && arg.modelType && utils_1.isObject(arg.emptyModel) && utils_1.isObject(arg.fields);
}
exports.isModelMetadata = isModelMetadata;
exports.newModelId = '--not-saved-new-model--';
/**
 * This function returns true if current model is just created to be later saved on backend
 * @param {ModelWithId} model
 * @return {boolean}
 */
function isNewModel(model) {
    return !model.id || model.id === exports.newModelId;
}
exports.isNewModel = isNewModel;
