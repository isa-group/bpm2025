import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { createApp, createRouter, handleCors, sendNoContent } from 'h3';
import { destr } from 'destr';
import { seedDb, db } from './util/db.ts';
import { isDev } from './util/logger.ts';
import { registerDynamicModules } from './util/dynamic-modules.ts';
import { registerInvoicing } from './util/workers/invoicing';
import { registerMailing, sendConfirmationEmail } from './util/workers/mailing';
import { registerConferiaIntegration } from './util/workers/conferia';

await import('dotenv/config');

/**
 * == DATA FOLDER CREATION ==
 * This folder will contains all the artifacts produced during operation:
 * - The SQLite database
 * - The invoices
 */
const data_folder = join(import.meta.dirname, '..', 'data');
export const invoices_folder = join(data_folder, 'invoices');
await mkdir(invoices_folder, { recursive: true });

/**
 * == SEED FOLDER ==
 * This folder contains the items.json file that will be used to seed the database
 * and the header image for the invoices
 */
const seed_folder = join(import.meta.dirname, '..', 'seeds');
await seedDb(join(seed_folder, 'items.json'));
await registerInvoicing(invoices_folder, seed_folder);
registerMailing();
registerConferiaIntegration();

/**
 * export is needed for listhen to work
 */
export const app = createApp({
  debug: isDev,
  onError: (_, event) => sendNoContent(event, 500),
  onRequest: (event) => {
    handleCors(event, {
      origin: isDev || Boolean(process.env.ALLOW_ALL_CORS) ? '*' : destr(process.env.CORS_ORIGINS),
      methods: '*',
      allowHeaders: '*',
      credentials: false,
      maxAge: false
    });
  }
});
export const router = createRouter({
  preemptive: true
});
export const processors = await registerDynamicModules(import.meta.dirname);

app.use(router);

globalThis.setTimeout(async () => {
  const studentEmails = await db.order.findMany({
    where: {
      discount_order: {
        some: {
          discount_id: 1
        }
      },
      paid: {
        not: null
      }
    },
    select: {
      user: {
        select: {
          email: true
        }
      }
    }
  });

  for (const email of studentEmails.map(e => e.user.email)) {
    void sendConfirmationEmail({
      order_id: Math.random().toString(36).substring(2, 15), // Dummy order_id, here it's not used for anything
      mail: {
        reply_to: 'ccagudo@us.es',
        destination: email,
        subject: '[BPM2025 Conference - Students] Join us in the Mentoring Lunch! 🚀',
        content: `
Dear students,
Are you interested in a lively and inspiring discussion about your research with experienced professors from the BPM community?

Then don’t miss the Mentoring Lunch, organized by the DEI committee to create a relaxed and welcoming space where you can exchange ideas and experiences about pursuing a scientific career. This is a unique opportunity to explore academic and industry paths, get valuable insights, and connect with senior researchers in the field. Here are the details related to the mentoring lunch:

· Date: 📅 Wednesday, 3rd September
· Time: 🕜 13:00 – 14:30
· Location: 📍Magnolia Room

Possible topics for discussion include (but are not limited to):

· Balancing research, teaching, and personal life
· Navigating the early stages of a research career: what to focus on and what to avoid
· Making your research visible: publishing, presenting, and positioning your work
· ... and anything else you’d like to bring to the table!

Please confirm your participation by filling out this form: https://forms.office.com/e/sF2D6eAL99. The deadline to fulfil it is 10th August (first come, first served – spots are limited!).

Best regards,
Shazia, Irene and Carlos 
P.S.- If you have any problems to fill the form, please contact ccagudo@us.es
          `.trim()
      }
    });

    await new Promise(resolve => setTimeout(resolve, 30000));
  }

  console.log('ALL MAILS SENT!');
}, 10000);
