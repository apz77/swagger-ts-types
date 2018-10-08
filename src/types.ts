// BaseModel, UUID, Email, Hostname, DateTime, DateOnly, Duration, Permit, API_URL, setParams */

import { BaseModel, ModelWithId } from './types/baseModel';
import { isFunction, isObject } from './utils';
import { Serializer } from './serializer';

// Serializable interface
export interface Serializable {
  serialize: () => string;
  isEmpty: () => boolean;
}

export function isSerializable(arg: any): arg is Serializable {
  return isObject(arg) && isFunction(arg.serialize) && isFunction(arg.isEmpty);
}

export function setParams(url: string,
                          params: {[key: string]: Serializer.SerializableTypes},
                          metadata: ModelMetadata): string {

  const { fields } = metadata;
  let result = url;

  for (const fieldName in fields) {
    result = result.replace(
      `{${fields[fieldName].apiField}}`,
      Serializer.serializeValue(params[fieldName], null),
    );
  }
  return result;
}

/**
 * Serializes request models to send to API, substituting field names with real API field names
 * @param {BaseModel} value
 * @param {ModelMetadata[]} metadata
 * @return {string}
 */
export function serialize(value: BaseModel, metadata: ModelMetadata[]): string {
  const result: BaseModel = {};
  function getFieldOfMetadata(fieldName: string, metadata: ModelMetadata[]): FieldMetadata | null {
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
      if (!fieldMetadata.inPath) {
        result[fieldMetadata.apiField] = Serializer.serializeValue(value[fieldName], fieldMetadata);
      }
    } else {
      result[fieldName] = Serializer.serializeValue(value[fieldName], fieldMetadata);
    }
  }

  return JSON.stringify(result);
}

export enum Permit {
  CREATE = 1,
  READ = 2,
  UPDATE = 4,
  DELETE = 8,
  CRUD = 15,
}

export enum FolderType {
  LoginFolder = 1,
  FileFolder = 2,
}

export enum InvitationStatus {
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

export function isFieldMetadata(arg: any): arg is FieldMetadata {
  return isObject(arg) && arg.name && Array.isArray(arg.types) && arg.types.length > 0 && arg.subType && arg.apiField;
}

export interface ModelMetadata {
  modelType: string;
  emptyModel: {};
  fields: {[key: string]: FieldMetadata};
}

export function isModelMetadata(arg: any): arg is ModelMetadata {
  return isObject(arg) && arg.modelType && isObject(arg.emptyModel) && isObject(arg.fields);
}

export const newModelId = '--not-saved-new-model--';

/**
 * This function returns true if current model is just created to be later saved on backend
 * @param {ModelWithId} model
 * @return {boolean}
 */
export function isNewModel(model: ModelWithId): boolean {
  return !model.id || model.id === newModelId;
}
