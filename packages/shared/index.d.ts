/**
 * This is the payload for creating an user in the backend
 */
export interface SignupPayload {
  email: string;
  name: string;
  billing_address: string;
  institution?: string;
}

/**
 * This is the payload for creating an order in the backend
 */
export interface OrderPayload extends SignupPayload {
  discount_code?: string;
  product_id: number;
  country: string;
  notes?: string;
}

/**
 * This is the payload the frontend receives from the backend
 */
export interface TPVOperation {
  parameters: string;
  signature: string;
  price: number;
}

/**
 * The HTTP POST notification payload that Redsys sends to the backend
 */
export interface RedsysResponse {
  Ds_SignatureVersion: 'HMAC_SHA256_V1';
  Ds_MerchantParameters: string;
  Ds_Signature: string;
}
