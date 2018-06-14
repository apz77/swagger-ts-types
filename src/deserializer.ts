import { ModelWithId } from './types/baseModel';
import { FieldMetadata, FolderType, InvitationStatus, ModelMetadata, Permit } from './types';
import { Duration } from './types/duration';
import { DateTime } from './types/dateTime';
import { Email } from './types/email';
import { UUID } from './types/uuid';
import { Hostname } from './types/hostname';
import { DateOnly } from './types/dateOnly';
import { Validator } from './validator';
import { isObject } from './utils';

export class DeserializeResult {
  protected value: any;
  protected errors: string[];

  constructor(value: any, errors?: string | string[]) {
    this.value = value;
    this.errors = [];
    if (Array.isArray(errors)) {
      this.errors = errors;
    } else if (errors) {
      this.errors.push(errors);
    }
  }

  public mergeErrors(value: DeserializeResult) {
    this.errors = this.errors.concat(value.errors);
  }

  public isOk() {
    return this.value !== void 0 && this.errors.length === 0;
  }

  public getErrors() {
    return this.errors;
  }

  public getValue() {
    return this.value;
  }
}

export interface GetModelFunc {
  (modelType: string, id: string): ModelWithId | Error;
}

export module Deserializer {

  type DenormalizerFunction = (value: any,
                               fieldMetadata: FieldMetadata,
                               getModel: GetModelFunc,
                               isKnownModelType: (arg: any) => boolean,
  ) => DeserializeResult;

  const denormalizersMap: {[key: string]: DenormalizerFunction} = {
    UUID: (value: any) => new DeserializeResult(new UUID(value)),
    Email: (value: any) => new DeserializeResult(new Email(value)),
    Hostname: (value: any) => new DeserializeResult(new Hostname(value)),
    Duration: (value: any) => new DeserializeResult(new Duration(value)),
    DateTime: (value: any) => new DeserializeResult(new DateTime(value)),
    DateOnly: (value: any) => new DeserializeResult(new DateOnly(value)),
    null: (value: any) => new DeserializeResult(value),
    string: (value: any) => new DeserializeResult(value),
    number: (value: any) => new DeserializeResult(value),
    boolean: (value: any) => new DeserializeResult(value),
    Permit: (value: any) => new DeserializeResult(Permit[value]),
    FolderType: (value: any) => new DeserializeResult(FolderType[value]),
    InvitationStatus: (value: any) => new DeserializeResult(InvitationStatus[value]),
    JSON: (value: any) => new DeserializeResult(value),
    ModelType: (value: any) => new DeserializeResult(value),
    ModelId: (value: any) => new DeserializeResult(value),
    Blob: (value: any) => new DeserializeResult(value),
    enum: (value: any) => new DeserializeResult(value),
    object: (value: any) => new DeserializeResult(value),

    array: denormalizeArray,
    link: denormalizeLink,
  };

  function getDenormalizer(type: string, value: any): DenormalizerFunction | undefined {
    if (denormalizersMap[type]) {
      return denormalizersMap[type];
    }

    if (isObject(value)) {
      return denormalizersMap['object'];
    }
  }

  export function denormalizeRawModel(rawModel: ModelWithId,
                                      metadata: ModelMetadata,
                                      getModel: GetModelFunc,
                                      isKnownModelType: (arg: any) => boolean,
  ): DeserializeResult {

    const model: any = {};
    const result = new DeserializeResult(model);

    if (isObject(rawModel)) {
      for (const fieldName in metadata.fields) {
        const fieldMetadata = metadata.fields[fieldName];
        const value = rawModel[fieldMetadata.apiField];
        if (fieldMetadata.isRequired || value !== void 0) {
          const denormalizeResult = Deserializer.denormalizeProp(value, fieldMetadata, getModel, isKnownModelType);
          model[fieldMetadata.name] = denormalizeResult.getValue();
          result.mergeErrors(denormalizeResult);
        }
      }
    } else {
      return new DeserializeResult(void 0, `Raw model is not an object: ${rawModel}`);
    }

    return result;
  }

  export function denormalizeProp(value: any,
                                  fieldMetadata: FieldMetadata,
                                  getModel: GetModelFunc,
                                  isKnownModelType: (arg: any) => boolean,
  ): DeserializeResult {

    if (fieldMetadata.isRequired && value === void 0) {
      return new DeserializeResult(value, `Required field ${fieldMetadata.apiField} is undefined.`);
    }

    for (const type of fieldMetadata.types) {
      if (Validator.isValidValue(value, [type])) {
        const denormalizer = getDenormalizer(type, value);
        if (denormalizer) {
          return denormalizer(value, fieldMetadata, getModel, isKnownModelType);
        }
        return new DeserializeResult(
          void 0,
          `No denormalizer for ${type} found` +
          `of ${JSON.stringify(value)} for field ${JSON.stringify(fieldMetadata)} `,
        );
      }
    }

    return new DeserializeResult(
      void 0,
      `Bad type or value ${JSON.stringify(fieldMetadata.types)} ` +
      `of ${JSON.stringify(value)} for field ${JSON.stringify(fieldMetadata)} `,
    );
  }

  export function denormalizeArray(value: any[],
                                   fieldMetadata: FieldMetadata,
                                   getModel: GetModelFunc,
                                   isKnownModelType: (arg: any) => boolean,
  ): DeserializeResult {
    const result: any = [];
    const errors: string[] = [];

    for (const item of value) {
      const denormalizer =  getDenormalizer(fieldMetadata.subType, item);

      if (denormalizer) {
        const isValid = Validator.isValidValue(item, [fieldMetadata.subType]);
        if (isValid) {
          const denormalizerResult = denormalizer(item, fieldMetadata, getModel, isKnownModelType);
          if (denormalizerResult.isOk()) {
            result.push(denormalizerResult.getValue());
          } else {
            errors.push(...denormalizerResult.getErrors());
          }
        } else {
          errors.push(`Invalid value ${JSON.stringify(item)} for subType ${fieldMetadata.subType}.`);
        }
      } else {
        errors.push(`No mormalizer found for subType ${fieldMetadata.subType}.`);
        result.push(item);
      }
    }

    return new DeserializeResult(result, errors);
  }

  export function denormalizeLink(value: any,
                                  fieldMetadata: FieldMetadata,
                                  getModel: GetModelFunc,
                                  isKnownModelType: (arg: any) => boolean,
  ): DeserializeResult  {

    if (isKnownModelType(fieldMetadata.subType)) {
      return new DeserializeResult(
        getModel(fieldMetadata.subType, value),
      );
    }

    return new DeserializeResult(
      void 0,
      `Unknown ModelType ${fieldMetadata.subType}`,
    );
  }

}
