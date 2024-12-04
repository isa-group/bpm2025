/**
 * Check if the value is a boolean.
 */
export function isBool(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Check if the value is null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Check if the value is an object.
 */
export function isObj(value: unknown): value is object {
  return typeof value === 'object' && !isNull(value);
}

/**
 * Check if the value is a string.
 */
export function isStr(value: unknown): value is string {
  return typeof value === 'string';
}
