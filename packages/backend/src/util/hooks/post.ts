import { db } from '../db.ts';
import { generateOrderInvoice } from '../invoicing/index.ts';
import { sendConfirmationEmail } from '../mailing/index.ts';

/**
 * Runs all the logic after the payment has been confirmed
 */
export async function postPaymentConfirm(order_id: string) {
  const full_order = await db.order.findUniqueOrThrow({
    where: {
      id: order_id
    },
    include: {
      user: true,
      product: true,
      discount_order: {
        include: {
          discount: true
        }
      }
    }
  });

  const invoice_path = await generateOrderInvoice({
    order: full_order,
    vat_rate: 0
  });

  await sendConfirmationEmail({
    order_id,
    mail: {
        destination: full_order.user.email,
    },
    invoice_path
  });
}
