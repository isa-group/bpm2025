import { db } from '../util/db.ts';
import { validateUserBody } from '@bpm2025-website/shared/validation/data';
import { logger } from '../util/logger.ts';
import type { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
  /**
   * Gets a form data object from the event body for creating an
   * user
   */
  fastify.post('/user', async (request, reply) => {
    const body = request.body;

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

        return reply.status(201).send();
      } else {
        logger.info(
          `User ${user.id} - ${user.name} - ${user.email} already exists, updating in DB...`
        );
        await db.user.update({
          data,
          where: { email: body.email }
        });
        return reply.status(202).send();
      }
    } else {
      return reply.status(400).send();
    }
  });
}
