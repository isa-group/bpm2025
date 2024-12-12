import { db } from '../db.ts';
// TODO: Implement once credit card payment is implemented
// import { generateOrderInvoice } from '../invoicing/index.ts';
import { sendConfirmationEmail } from '../mailing/index.ts';

/**
 * Runs all the logic after the payment has been confirmed
 */
export async function postPaymentConfirm(order_id: string) {
  // TODO: This is the query that should be run once the credit card payment is implemented.
  // const full_order = await db.order.findUniqueOrThrow({
  //   where: {
  //     id: order_id
  //   },
  //   include: {
  //     user: true,
  //     product: true,
  //     discount_order: {
  //       include: {
  //         discount: true
  //       }
  //     }
  //   }
  // });

  // TODO: Remove once credit card payment is implemented, since it will be calculated in the receipt.
  const order_details = await db.full_order_details.findUniqueOrThrow({
    where: {
      order_ID: order_id
    },
    select: {
      price_paid_with_discounts: true,
      user_email: true
    }
  });

  // const invoice_path = await generateOrderInvoice({
  //   order: full_order,
  //   vat_rate: 0
  // });

  await sendConfirmationEmail({
    order_id,
    mail: {
      destination: order_details.user_email,
      subject: `[BPM2025 Conference] Payment details for order ${order_id}`,
      content: `
Thank you for registering in BPM2025!

We have received your details. However, since right now we don't
have payments by credit card enabled yet, you need to pay through
a SEPA bank transfer. Once we confirm your payment, you will receive
an additional email with the confirmation receipt.

Here are the transfer details:

Amount: ${order_details.price_paid_with_discounts}€
Concept: ${order_id} BPM2025 Registration
IBAN: ES56 0049 0919 1426 1025 1252
BIC/Swift: BSCHESMM
Address: Avda Reina Mercedes, 19, 41012, Sevilla

If you have any doubt or problem, don't hesitate in contacting us at info@bpm2025seville.org

Thank you very much for joining us! 🚀
      `.trim()
    }
  });
}
