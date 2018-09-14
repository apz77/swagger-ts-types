import { FieldMetadata, FolderType, InvitationStatus, Permit } from './types';
import { UUID } from './types/uuid';
import { Email } from './types/email';
import { Hostname } from './types/hostname';
import { Duration } from './types/duration';
import { DateTime } from './types/dateTime';
import { DateOnly } from './types/dateOnly';
import { ModelWithId } from './types/baseModel';
export declare module Serializer {
    type SerializableTypes = null | string | number | boolean | UUID | Email | Hostname | Duration | DateTime | DateOnly | Permit | FolderType | InvitationStatus | any[] | {} | ModelWithId;
    /**
     * Serializes known value types
     * @param {ValueTypes} value
     */
    function serializeValue(value: SerializableTypes, type: FieldMetadata | string | null): any;
}
