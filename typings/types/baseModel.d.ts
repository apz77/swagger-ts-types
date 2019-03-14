export interface BaseModel {
}
export interface ModelWithId extends BaseModel {
    id: string;
}
export declare function isModelWithId(arg: any): arg is ModelWithId;
