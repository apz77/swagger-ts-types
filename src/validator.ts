import { FolderType, InvitationStatus, Permit } from './types';
import { UUID } from './types/uuid';
import { Email } from './types/email';
import { Hostname } from './types/hostname';
import { Duration } from './types/duration';
import { DateTime } from './types/dateTime';
import { DateOnly } from './types/dateOnly';
import { isObject } from './utils';

export type Type = string;

export module Validator {

  const validatorsMap: {[key: string]: (value: any) => boolean} = {
    null: (value: any) => value === null,
    string: (value: any) => typeof value === 'string',
    UUID: (value: any) => UUID.isValidSerialized(value),
    Email: (value: any) => Email.isValidSerialized(value),
    Hostname: (value: any) => Hostname.isValidSerialized(value),
    Duration: (value: any) => Duration.isValidSerialized(value),
    DateTime: (value: any) => DateTime.isValisSerialized(value),
    DateOnly: (value: any) => DateOnly.isValidSerialized(value),
    number: (value: any) => typeof value === 'number',
    boolean: (value: any) => typeof value === 'boolean',
    Permit: (value: any) => value in Permit,
    FolderType: (value: any) => value in FolderType,
    InvitationStatus: (value: any) => value in InvitationStatus,
    JSON: (value: any) => {
      if (isObject(value)) {
        return true;
      }
      try {
        JSON.parse(value);
      } catch (e) {
        return false;
      }
      return true;
    },
    ModelType: (value: any) => (typeof value === 'string') && !!value,
    ModelId: (value: any) => (typeof value === 'string') && !!value,
    Blob: (value: any) => true,
    array: (value: any) => Array.isArray(value),
    object: (value: any) => isObject(value),
    enum: (value: any) => (typeof value === 'string') && !!value,
    link: (value: any) => (typeof value === 'string') && !!value,
  };

  function getValidator(type: string, value: any) {
    if (validatorsMap[type]) {
      return validatorsMap[type];
    }

    if (isObject(value)) {
      return validatorsMap['object'];
    }
  }

  /**
   * Check, whether value is valid, according to it's metadata
   * @param value
   * @return {boolean}
   */
  export function isValidValue(value: any, types: Type[]) {
    for (const type of types) {
      const validator = getValidator(type, value);
      return validator && validator(value);
    }

    return false;
  }
}
