import type { OrderPayload } from '@bpm2025-website/shared';
import type { ProcessorSignature } from '#/types';

const super_early_deadline = new Date(2025, 1, 1); // February 1st, 2025
const early_deadline = new Date(2025, 6, 21); // July 21st, 2025
const includesConference
  = (product_id: number | string) => [2, 3].includes(Number(product_id));
const isWorkshopsOnly
  = (product_id: number | string) => Number(product_id) === 1;

export default (): ProcessorSignature => {
  return {
    1: (req_body: OrderPayload) => 'is_student' in req_body && Boolean(req_body.is_student),
    2: (req_body: OrderPayload) => {
      const current_date = new Date();

      return includesConference(req_body.product_id)
        && current_date < early_deadline
        && current_date >= super_early_deadline;
    },
    3: (req_body: OrderPayload): boolean => {
      const current_date = new Date();

      return includesConference(req_body.product_id)
        && current_date < super_early_deadline;
    },
    4: (req_body: OrderPayload): boolean => {
      const current_date = new Date();

      return isWorkshopsOnly(req_body.product_id)
        && current_date < early_deadline
        && current_date >= super_early_deadline;
    },
    5: (req_body: OrderPayload): boolean => {
      const current_date = new Date();

      return isWorkshopsOnly(req_body.product_id)
        && current_date < super_early_deadline;
    }
  };
};
