export interface BaseModel {
    [key: string]: any;
}
export interface ModelWithId extends BaseModel {
    id: string;
}
export declare function isModelWithId(arg: any): arg is ModelWithId;
