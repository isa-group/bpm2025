import { parentPort } from 'node:worker_threads';
import { createTransport } from 'nodemailer';

export interface Inputs {
  order_id: string;
  mail: {
    destination: string;
    content?: string;
    subject?: string;
    from?: string;
    reply_to?: string;
    cc?: string;
    bcc?: string;
  };
  invoice_path?: string;
}

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Boolean(process.env.SMTP_SECURE),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  pool: true
});

transporter.verify((err, success) => {
  if (err) {
    console.error('SMTP connection could not be verified. Please check your configuration\n\n', err);
  }

  if (success) {
    console.log('Mailing module started up successfully!');
  }
});

const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_REPLY_TO = process.env.MAIL_REPLY_TO;
const MAIL_SUBJECT = process.env.MAIL_SUBJECT;
const MAIL_CONTENT = process.env.MAIL_CONTENT;
const MAIL_CC = process.env.MAIL_CC;
const MAIL_BCC = process.env.MAIL_BCC;

parentPort?.on('message', async (inputs: Inputs) => {
  try {
    await transporter.sendMail({
      from: inputs.mail.from ?? MAIL_FROM,
      to: inputs.mail.destination,
      subject: (MAIL_SUBJECT ?? inputs.mail.subject ?? '').replace('{order_id}', inputs.order_id),
      replyTo: inputs.mail.reply_to ?? MAIL_REPLY_TO,
      cc: inputs.mail.cc ?? MAIL_CC,
      bcc: inputs.mail.bcc ?? MAIL_BCC,
      text: inputs.mail.content ?? MAIL_CONTENT ?? 'Please find your invoice attached.',
      ...(inputs.invoice_path
        ? {
            attachments: [
              {
                filename: 'receipt.pdf',
                path: inputs.invoice_path
              }
            ]
          }
        : {})
    });

    console.log(`Mail to ${inputs.mail.destination} sent successfully`);

    parentPort?.postMessage({
      success: true,
      order_id: inputs.order_id
    });
  } catch (e) {
    console.error(`Error when sending email to ${inputs.mail.destination}:`, e);
    parentPort?.postMessage({
      success: false,
      order_id: inputs.order_id,
      error: e
    });
  }
});
