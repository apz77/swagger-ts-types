// Miscellaneous functions and typeguards

export function isObject(value: any): value is {[key: string]: any} {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function isString(value: any): value is string {
  return typeof value === 'string' || (isObject(value) && Object.prototype.toString.call(value) === '[object String]');
}

export function isFunction(value: any): value is Function {
  const tag = Object.prototype.toString.call(value);
  return isObject(value) &&
      (tag === '[object AsyncFunction]' || tag === '[object Function]' || tag === '[object GeneratorFunction]');
}
