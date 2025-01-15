import { defineEventHandler } from 'h3';
import { router } from '#/app.ts';

/**
 * Gets a ping response from the system
 */
router.get(
  '/ping',
  defineEventHandler(() => ({ message: '⚡️ Tadaa!' }))
);
