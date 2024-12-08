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
  product_id: number;
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
