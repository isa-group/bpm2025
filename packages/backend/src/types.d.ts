export interface RedsysMerchantParameters {
  DS_MERCHANT_AMOUNT: string;
  DS_MERCHANT_CURRENCY: string;
  DS_MERCHANT_MERCHANTCODE: string;
  DS_MERCHANT_MERCHANTURL: string;
  DS_MERCHANT_ORDER: string;
  DS_MERCHANT_TERMINAL: string;
  DS_MERCHANT_TRANSACTIONTYPE: string;
  DS_MERCHANT_PRODUCTDESCRIPTION: string;
  DS_MERCHANT_CONSUMERLANGUAGE: string;
  DS_MERCHANT_URLKO?: string;
  DS_MERCHANT_URLOK?: string;
  DS_MERCHANT_TITULAR: string;
};

export interface RedsysResponse extends RedsysMerchantParameters {
  Ds_Response?: string;
  DS_RESPONSE?: string;
  Ds_Order?: string;
  DS_ORDER?: string;
}

export type Awaitable<T> = T | Promise<T>;
export type ProcessorSignature = Record<number, (req_body: OrderPayload) => Awaitable<boolean>>;

interface ProductSeed {
  id: number;
  reduction: number;
}

interface DiscountSeed {
  id: number;
  discount: number;
}
