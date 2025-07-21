import type { OrderPayload, RedsysResponse, SignupPayload } from '@bpm2025-website/shared';
import { isObj, isStr, isNumber } from '.';

/**
 * Validates the user body for creating a new user in the backend
 */
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

/**
 * Validates the order body for creating a new order in the backend
 */
export function validateOrderBody(
  payload: unknown
): payload is OrderPayload {
  const result = validateUserBody(payload) && 'product_id' in payload && isNumber(payload.product_id);

  if (result) {
    for (const key in payload) {
      if (isStr((payload as Record<string, unknown>)[key])) {
        (payload as Record<string, unknown>)[key] = ((payload as Record<string, unknown>)[key] as string).trim();
      }
    }
  }

  return result;
}

/***
 * Ensures the response from Redsys TPV follows our expected format
 */
export function validateRedsysResponse(
  payload: unknown
): payload is RedsysResponse {
  return isObj(payload)
    && 'Ds_SignatureVersion' in payload
    && 'Ds_Signature' in payload
    && 'Ds_MerchantParameters' in payload
    && isStr(payload.Ds_SignatureVersion)
    && payload.Ds_SignatureVersion === 'HMAC_SHA256_V1'
    && isStr(payload.Ds_Signature)
    && isStr(payload.Ds_MerchantParameters);
}
