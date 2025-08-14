import { registerInvoicing } from './invoicing/index.ts';
import { registerMailing } from './mailing/index.ts';

/**
 * Configuration type for worker registration parameters
 */
interface WorkerParams {
  invoicing: Parameters<typeof registerInvoicing>;
}

/**
 * Starts the workers of the application
 */
export default async function registerWorkers(params: Partial<WorkerParams>) {
  if (params.invoicing) {
    await registerInvoicing(...params.invoicing);
  }

  registerMailing();
}
