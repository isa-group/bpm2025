import { consola } from 'consola';

export const logger = consola.create({});
export const isDev = process.env.NODE_ENV === 'development'
  || Boolean(process.env.DEBUG)
  || Boolean(process.env.DEV)
  || process.env.npm_command === 'start'
;

logger.wrapAll();
