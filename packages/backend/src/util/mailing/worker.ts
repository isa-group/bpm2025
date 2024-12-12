// @ts-expect-error - workerData is redeclared for types only, but TS doesn't know.
import { parentPort, workerData } from 'node:worker_threads';
import { createTransport } from 'nodemailer';

export interface WorkerData {
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  MAIL_FROM: string;
  MAIL_REPLY_TO?: string;
  MAIL_SUBJECT: string;
  MAIL_CONTENT?: string;
}

declare const workerData: WorkerData;

export interface Inputs {
  order_id: string;
  mail: {
    destination: string;
    content?: string;
    subject?: string;
    from?: string;
    reply_to?: string;
  };
  invoice_path?: string;
}

const transporter = createTransport({
  host: workerData.SMTP_HOST,
  port: workerData.SMTP_PORT,
  secure: workerData.SMTP_SECURE,
  auth: {
    user: workerData.SMTP_USER,
    pass: workerData.SMTP_PASSWORD
  },
  pool: true
});

transporter.verify((err) => {
  if (err) {
    console.error('SMTP connection could not be verified. Please check your configuration\n\n', err);
  }
});

parentPort?.on('message', async (inputs: Inputs) => {
  try {
    await transporter.sendMail({
      from: inputs.mail.from ?? workerData.MAIL_FROM,
      to: inputs.mail.destination,
      subject: (workerData.MAIL_SUBJECT ?? inputs.mail.subject).replace('{order_id}', inputs.order_id),
      replyTo: inputs.mail.reply_to ?? workerData.MAIL_REPLY_TO,
      text: inputs.mail.content ?? workerData.MAIL_CONTENT ?? 'Please find your invoice attached.',
      ...(inputs.invoice_path
        ? {
            attachments: [
              {
                filename: 'invoice.pdf',
                path: inputs.invoice_path
              }
            ]
          }
        : {})
    });
    parentPort?.postMessage({
      success: true,
      order_id: inputs.order_id
    });
  } catch (e) {
    parentPort?.postMessage({
      success: false,
      order_id: inputs.order_id,
      error: e
    });
  }
});
