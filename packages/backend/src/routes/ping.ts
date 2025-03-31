import type { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
  /**
   * Gets a ping response from the system
   */
  fastify.get('/ping', () => undefined);
}
