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
}

declare const workerData: WorkerData;

export interface Inputs {
  order_id: string;
  destination_email: string;
  invoice_path: string;
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

parentPort?.on('message', async (inputs: Inputs) => {
  try {
    await transporter.sendMail({
      from: workerData.MAIL_FROM,
      to: inputs.destination_email,
      subject: workerData.MAIL_SUBJECT.replace('{order_id}', inputs.order_id),
      replyTo: workerData.MAIL_REPLY_TO,
      text: 'Please find your invoice attached.',
      attachments: [
        {
          filename: 'invoice.pdf',
          path: inputs.invoice_path
        }
      ]
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
