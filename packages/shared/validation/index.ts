/**
 * Check if the value is a number.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Check if the value is null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Check if the value is a string.
 */
export function isStr(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Check if the value is an object.
 */
export function isObj(value: unknown): value is object {
  return typeof value === 'object' && !isNull(value);
}

/**
 * Check if the value is a boolean.
 */
export function isBool(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Check if the given value is a funcion
 */
export function isFunc(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * Check if the value is undefined
 */
export function isUndef(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Check if the value is null or undefined
 */
export function isNil(value: unknown): value is null | undefined {
  return isUndef(value) || isNull(value);
}

/**
 * Checks if the passed object is empty or not
 *
 * @param value - Object to test
 */
export function isEmpty(value: object): boolean {
  for (const _ in value) {
    return false;
  }

  return true;
}
