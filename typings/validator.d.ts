export declare type Type = string;
export declare module Validator {
    /**
     * Check, whether value is valid, according to it's metadata
     * @param value
     * @return {boolean}
     */
    function isValidValue(value: any, types: Type[]): boolean | undefined;
}
