import type { OrderPayload } from '@bpm2025-website/shared';
import type { ProcessorSignature } from '@/types';

const super_early_deadline = new Date(2025, 0, 16);
const early_deadline = new Date(2025, 6, 15);
const includesConference
  = (product_id: number | string): boolean => [2, 3].includes(Number(product_id));
const isWorkshopsOnly
  = (product_id: number | string): boolean => Number(product_id) === 1;

export default (): ProcessorSignature => {
  return {
    1: (req_body: OrderPayload): boolean => {
      return 'is_student' in req_body && Boolean(req_body.is_student);
    },
    2: (req_body: OrderPayload): boolean => {
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