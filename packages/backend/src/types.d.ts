export interface RedsysMerchantParameters {
  DS_MERCHANT_AMOUNT: string;
  DS_MERCHANT_CURRENCY: string;
  DS_MERCHANT_MERCHANTCODE: string;
  DS_MERCHANT_ORDER: string;
  DS_MERCHANT_TERMINAL: string;
  DS_MERCHANT_TRANSACTIONTYPE: string;
  DS_MERCHANT_PRODUCTDESCRIPTION: string;
  DS_MERCHANT_CONSUMERLANGUAGE: string;
  DS_MERCHANT_URLKO?: string;
  DS_MERCHANT_URLOK?: string;
  DS_MERCHANT_TITULAR: string;
};

export type Awaitable<T> = T | Promise<T>;
export type ProcessorSignature = Record<number, (req_body: OrderPayload) => Awaitable<boolean>>;

/**
 * The Ds_MerchantParameters decoded from the Redsys response,
 * received after a successful or failed operation.
 */
export interface RedsysResponseMerchantParametersDecoded {
  Ds_Order: string;
  Ds_Response: string;
}
