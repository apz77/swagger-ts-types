import { ModelWithId } from './types/baseModel';
import { FieldMetadata, ModelMetadata } from './types';
export declare class DeserializeResult {
    protected value: any;
    protected errors: string[];
    constructor(value: any, errors?: string | string[]);
    mergeErrors(value: DeserializeResult): void;
    isOk(): boolean;
    getErrors(): string[];
    getValue(): any;
}
export interface GetModelFunc {
    (modelType: string, id: string): ModelWithId | Error;
}
export declare module Deserializer {
    function denormalizeRawModel(rawModel: ModelWithId, metadata: ModelMetadata, getModel: GetModelFunc, isKnownModelType: (arg: any) => boolean): DeserializeResult;
    function denormalizeProp(value: any, fieldMetadata: FieldMetadata, getModel: GetModelFunc, isKnownModelType: (arg: any) => boolean): DeserializeResult;
    function denormalizeArray(value: any[], fieldMetadata: FieldMetadata, getModel: GetModelFunc, isKnownModelType: (arg: any) => boolean): DeserializeResult;
    function denormalizeLink(value: any, fieldMetadata: FieldMetadata, getModel: GetModelFunc, isKnownModelType: (arg: any) => boolean): DeserializeResult;
}
