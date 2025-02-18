import { db } from '../db.ts';
import { generateOrderInvoice } from '../workers/invoicing';
import { sendConfirmationEmail } from '../workers/mailing';

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
    invoice_path,
    mail: {
      destination: full_order.user.email,
      subject: `[BPM2025 Conference - ${order_id}] Your registration has been confirmed!`,
      content: `
Thank you for registering in BPM2025! 🎉

Attached to this email you will find a receipt for your order.
If you need an invoice with VAT, please reply to this email

Thank you very much for joining us! 🚀
      `.trim()
    }
  });
}
