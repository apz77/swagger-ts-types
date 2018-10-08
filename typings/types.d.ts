import { BaseModel, ModelWithId } from './types/baseModel';
import { Serializer } from './serializer';
export interface Serializable {
    serialize: () => string;
    isEmpty: () => boolean;
}
export declare function isSerializable(arg: any): arg is Serializable;
export declare function setParams(url: string, params: {
    [key: string]: Serializer.SerializableTypes;
}, metadata: ModelMetadata): string;
/**
 * Serializes request models to send to API, substituting field names with real API field names
 * @param {BaseModel} value
 * @param {ModelMetadata[]} metadata
 * @return {string}
 */
export declare function serialize(value: BaseModel, metadata: ModelMetadata[]): string;
export declare enum Permit {
    CREATE = 1,
    READ = 2,
    UPDATE = 4,
    DELETE = 8,
    CRUD = 15,
}
export declare enum FolderType {
    LoginFolder = 1,
    FileFolder = 2,
}
export declare enum InvitationStatus {
    Pending = 1,
    Accepted = 2,
}
export interface FieldMetadata {
    name: string;
    types: string[];
    subType: string;
    isRequired: boolean;
    apiField: string;
    inPath?: boolean;
}
export declare function isFieldMetadata(arg: any): arg is FieldMetadata;
export interface ModelMetadata {
    modelType: string;
    emptyModel: {};
    fields: {
        [key: string]: FieldMetadata;
    };
}
export declare function isModelMetadata(arg: any): arg is ModelMetadata;
export declare const newModelId = "--not-saved-new-model--";
/**
 * This function returns true if current model is just created to be later saved on backend
 * @param {ModelWithId} model
 * @return {boolean}
 */
export declare function isNewModel(model: ModelWithId): boolean;
