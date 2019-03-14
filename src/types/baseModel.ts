import { isObject } from "../utils";

export interface BaseModel {}

export interface ModelWithId extends BaseModel {
  id: string;
}

export function isModelWithId(arg: any): arg is ModelWithId {
  return isObject(arg) && arg.id;
}
