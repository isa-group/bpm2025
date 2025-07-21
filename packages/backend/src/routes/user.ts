import { defineEventHandler, readBody } from 'h3';
import { validateUserBody } from '@bpm2025-website/shared/validation/data';
import { router } from '../app.ts';
import { db } from '../util/db.ts';
import { logger } from '../util/logger.ts';

/**
 * Gets a form data object from the event body for creating an
 * user
 */
router.post(
  '/user',
  defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (validateUserBody(body)) {
      body.email = body.email.toLowerCase();

      const data = {
        name: body.name,
        email: body.email,
        billing_address: body.billing_address,
        institution: body.institution
      };
      const user = await db.user.findUnique({ where: { email: body.email } });

      if (!user) {
        const new_user = await db.user.create({
          data
        });

        logger.info(`User created: ${new_user.id} - ${new_user.name} - ${new_user.email}`);

        return new Response(null, { status: 201 });
      } else {
        logger.info(
          `User ${user.id} - ${user.name} - ${user.email} already exists, updating in DB...`
        );
        await db.user.update({
          data,
          where: { email: body.email }
        });
        return new Response(null, { status: 202 });
      }
    } else {
      return new Response(null, { status: 400 });
    }
  })
);
