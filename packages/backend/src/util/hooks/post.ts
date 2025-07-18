import { db } from '../db.ts';
import { generateOrderInvoice } from '../workers/invoicing';
import { sendConfirmationEmail } from '../workers/mailing';
import { registerUserWithConferia } from '../workers/conferia';

/**
 * Runs all the logic after the payment has been confirmed
 */
export async function postPaymentConfirm(order_id: string, email = true) {
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

  try {
    const nameParts = full_order.user.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const company = full_order.user.institution;
    const country = full_order.notes?.match(/COUNTRY: ([^\n]+)/)?.[1];

    await registerUserWithConferia({
      email: full_order.user.email,
      firstname: firstName,
      lastname: lastName,
      company: company,
      country: country
    });
  } catch (error) {
    console.error('Failed to register user with CONFERIA:', error);
  }

  if (email) {
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
}
