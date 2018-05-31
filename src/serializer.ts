import { FolderType, InvitationStatus, isSerializable, Permit } from './types';
import { UUID } from './types/uuid';
import { Email } from './types/email';
import { Hostname } from './types/hostname';
import { Duration } from './types/duration';
import { DateTime } from './types/dateTime';
import { DateOnly } from './types/dateOnly';
import { isModelWithId, ModelWithId } from './types/baseModel';
import { isObject } from './utils';

export module Serializer {

  export type SerializableTypes = null | string | number | boolean | UUID | Email | Hostname | Duration | DateTime |
    DateOnly | Permit | FolderType | InvitationStatus | any[] | {} | ModelWithId;

  /**
   * Serializes known value types
   * @param {ValueTypes} value
   */
  export function serializeValue(value: SerializableTypes): any {

    // Order of "if"s is critical

    if (isSerializable(value)) {
      return value.serialize();
    }

    if (isModelWithId(value)) {
      return value.id;
    }

    if (Array.isArray(value)) {
      return value.map(val => serializeValue(val));
    }

    if (value && isObject(value)) {
      const serialized: {[key: string]: any} = {};
      for (const propName in value as {[key: string]: any}) {
        serialized[propName] = serializeValue((value as {[key: string]: any})[propName]);
      }
      return serialized;
    }

    return value;
  }
}
