import type { RedsysResponse, RedsysMerchantParameters } from '@/types';
import type { TPVOperation } from '@bpm2025-website/shared';
import { destr } from 'destr';
import { createCipheriv, createHmac } from 'node:crypto';
import { isDev } from './util/logger';

/**
 * Cryptography functions has been derived from the code of https://github.com/santiperez/node-redsys-api,
 * originally published with the MIT license.
 *
 * The logic is engineered towards being used with the redirection implementation only.
 */

if (!process.env.REDSYS_MERCHANT_CODE
  || !process.env.REDSYS_MERCHANT_TERMINAL
  || !process.env.REDSYS_MERCHANT_KEY
  || !process.env.BASE_URL) {
  const msg = 'REDSYS_MERCHANT_CODE, REDSYS_MERCHANT_TERMINAL, REDSYS_MERCHANT_KEY or BASE_URL'
    + ' not set in the environment variables';

  if (isDev) {
    console.warn(`${msg}.\nRedsys testing values will be used in development, but make sure to set those in production`);
  } else {
    console.error(`${msg}.\nHalting...`);
    process.exit(1);
  }
}

const REDSYS_MERCHANT_KEY = process.env.REDSYS_MERCHANT_KEY || 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';
const DS_MERCHANT_MERCHANTCODE = process.env.REDSYS_MERCHANT_CODE || '999008881';
const DS_MERCHANT_TERMINAL = process.env.REDSYS_MERCHANT_TERMINAL || '049';
const DS_MERCHANT_MERCHANTURL = `${process.env.BASE_URL}/payment`;
const DS_MERCHANT_URLOK = DS_MERCHANT_MERCHANTURL;

/**
 * Pads a buffer with zeros to reach a multiple of blocksize
 * @param buf - Buffer or string to pad
 * @param blocksize - Block size for padding
 * @returns - Buffer padded with zeros to next blocksize multiple
 */
function zeroPad(buf: string, blocksize: number) {
  const buffer = typeof buf === 'string' ? Buffer.from(buf, 'utf8') : buf;
  const pad = Buffer.alloc((blocksize - (buffer.length % blocksize)) % blocksize, 0);
  return Buffer.concat([buffer, pad]).toString('utf8');
}

/**
 * Encrypts a string using 3DES-CBC algorithm with a Base64 key
 * @param str - String to encrypt
 * @param key - Key in Base64 format
 * @returns - Encryption result in Base64
 */
function encrypt3DES(str: string, key: string) {
  const secretKey = Buffer.from(key, 'base64');
  const iv = Buffer.alloc(8, 0);
  const cipher = createCipheriv('des-ede3-cbc', secretKey, iv);
  cipher.setAutoPadding(false);
  return cipher.update(zeroPad(str, 8), 'utf8', 'base64').concat(cipher.final('base64'));
}

/**
 * Calculates HMAC-SHA256 of data using a Base64 key
 * @param data - Data to calculate HMAC from
 * @param key - Key in Base64 format
 * @returns - Resulting HMAC in Base64 format
 */
function mac256(data: string, key: string) {
  return createHmac('sha256', Buffer.from(key, 'base64'))
    .update(data)
    .digest('base64');
}

/**
 * Converts the given parameter to Base64
 * @param data - Redsys merchant parameters
 * @returns - Base64 encoded JSON
 */
function encodeBase64(data: string) {
  return Buffer.from(data, 'utf8').toString('base64');
}

/**
 * Converts the given merchant parameters to Base64
 * @param data - Redsys merchant parameters
 * @returns - Base64 encoded JSON
 */
function encodeMerchantParameters(data: RedsysMerchantParameters) {
  return encodeURIComponent(encodeBase64(JSON.stringify(data)));
}

/**
 * Decodes the given base64 string to a string
 * @param data - Redsys merchant parameters
 * @returns - Base64 encoded JSON
 */
function decodeBase64(data: string) {
  return Buffer.from(data, 'base64').toString('utf8');
}

/**
 * Turns the stringified merchant parameters into an object
 * @param data - Redsys merchant parameters
 * @returns - Base64 encoded JSON
 */
function decodeRedsysResponse(data: string) {
  return destr<RedsysResponse>(decodeURIComponent(decodeBase64(data)));
}

/**
 * Generates signature for a Redsys transaction
 * @param merchant_key - Merchant key in Base64 format
 * @param merchant_params - Redsys merchant parameters
 * @returns - Transaction signature in Base64
 */
function createMerchantSignature(
  merchant_key: string,
  merchant_params: RedsysMerchantParameters,
  encoded_merchant_parameters = encodeMerchantParameters(merchant_params)
) {
  return mac256(
    encoded_merchant_parameters,
    encrypt3DES(merchant_params.DS_MERCHANT_ORDER, merchant_key)
  );
}

/**
 * Checks if a signature by comparing if the operation signature
 * equals to the expected signature after the operation.
 */
function merchantSignatureIsValid(signature: string, expectedSignature: string) {
  return decodeBase64(signature) === decodeBase64(expectedSignature);
}

/**
 * Generates the signature from a RedsysResponse, so we can verify if it matches
 * @param decoded_response - Decoded TPV response as string
 * @param response - Parsed TPV response object (optional, automatically decoded if not provided)
 * @param key - Merchant key in Base64 format (optional, defaults to REDSYS_MERCHANT_KEY)
 * @returns Notification signature in Base64 format
 * @throws {Error} When order ID is not found in the response
 */
function createMerchantSignatureNotif(
  decoded_response: string,
  response = decodeRedsysResponse(decoded_response),
  key = REDSYS_MERCHANT_KEY
) {
  const orderId = response.Ds_Order || response.DS_ORDER;

  if (!orderId) {
    throw new Error('No order ID found in the response');
  }

  return encodeBase64(mac256(decoded_response, encrypt3DES(orderId, key)));
}

/**
 * Generates a Redsys-compliant order id, ensuring its uniqueness by
 * using a combination of Math.random and v4 UUIDs.
 *
 * See https://pagosonline.redsys.es/parametros-entrada-salida.html,
 * section `Ds_Merchant_Order` for reference.
 */
export function generateOrderId(): string {
  /**
   * Generate random numbers for the first 4 digits
   */
  const numericPart = Array.from(
    { length: 4 },
    () => Math.floor(Math.random() * 10)
  ).join('');

  /**
   * Get random characters from the UUID, filtered
   * by our requirements.
   */
  const uuid = crypto.randomUUID().replace(/-/g, '');
  const allowedChars = uuid.split('').filter((char) => {
    const code = char.charCodeAt(0);
    return (
      (code >= 48 && code <= 57) // 0-9
      || (code >= 65 && code <= 90) // A-Z
      || (code >= 97 && code <= 122) // a-z
    );
  }).join('');

  /**
   * Combine the numeric part with the allowed characters
   */
  return numericPart.concat(allowedChars.slice(0, 8));
}

/**
 * Gets the base merchant parameters for a Redsys transaction
 */
export const getBaseMerchantParameters = ({
  amount,
  name,
  productName,
  orderId = generateOrderId()
}: {
  amount: number;
  name: string;
  productName: string;
  orderId?: string;
}): RedsysMerchantParameters => ({
  DS_MERCHANT_AMOUNT: String(amount * 100),
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTCODE,
  DS_MERCHANT_MERCHANTURL,
  DS_MERCHANT_ORDER: orderId,
  DS_MERCHANT_TERMINAL,
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_PRODUCTDESCRIPTION: productName.slice(0, 125),
  /**
   * English language. See https://pagosonline.redsys.es/conexion-insite.html#catalogo-idiomas
   */
  DS_MERCHANT_CONSUMERLANGUAGE: '002',
  ...(DS_MERCHANT_URLOK ? { DS_MERCHANT_URLOK } : {}),
  DS_MERCHANT_TITULAR: name.slice(0, 60)
});

/**
 * Gets the full TPV operation data for a Redsys transaction as they must be passed to the frontend.
 *
 * @param merchant_params - The object with the merchant params
 * @param merchant_key - The secret key of the merchant used for generating signatures and provided in the Redsys dashboard
 * @returns - The full TPV operation data, including the encoded parameters and the signature.
 */
export function getTPVOperationData(
  merchant_params: RedsysMerchantParameters,
  merchant_key = REDSYS_MERCHANT_KEY
): Omit<TPVOperation, 'order_id' | 'price'> {
  const parameters = encodeMerchantParameters(merchant_params);

  return {
    parameters,
    signature: createMerchantSignature(merchant_key, merchant_params, parameters)
  };
}

/**
 * Verifies if the operation signature given by the user is valid,
 * ensuring that the payment was not tampered.
 */
export function isValidTransaction(op: TPVOperation, merchant_key = REDSYS_MERCHANT_KEY): boolean {
  const { parameters: merchantParams, signature } = op;

  const merchantParamsDecoded = decodeRedsysResponse(merchantParams);
  const merchantSignatureNotif = createMerchantSignatureNotif(merchantParams, merchantParamsDecoded, merchant_key);
  const response = merchantParamsDecoded.Ds_Response ?? merchantParamsDecoded.DS_RESPONSE;

  if (!response) {
    throw new Error('No valid DS_RESPONSE found in the response');
  }

  const dsResponse = parseInt(response, 10);

  return merchantSignatureIsValid(signature, merchantSignatureNotif) && dsResponse > -1 && dsResponse < 100;
}
