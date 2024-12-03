import type { OrderPayload, SignupPayload } from '..';
import { isObj, isStr, isNumber } from '.';

export function validateUserBody(
  payload: unknown
): payload is SignupPayload {
  const isObject = isObj(payload);
  const correctName = isObject
    && 'name' in payload
    && isStr(payload.name)
    && Boolean(payload.name);
  const correctEmail = isObject
    && 'email' in payload
    && isStr(payload.email)
    && Boolean(payload.email);
  const correctBillingAddress = isObject
    && 'billing_address' in payload
    && isStr(payload.billing_address)
    && Boolean(payload.billing_address);

  return correctName && correctEmail && correctBillingAddress;
}

export function validateOrderBody(
  payload: unknown
): payload is OrderPayload {
  return validateUserBody(payload) && 'product_id' in payload && isNumber(payload.product_id);
}
