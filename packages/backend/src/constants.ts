import { join } from "node:path";
import { registerDynamicModules } from "./util/dynamic-modules.ts";

const data_folder = join(import.meta.dirname, '..', 'data');
export const invoices_folder = join(data_folder, 'invoices');
export const seed_folder = join(import.meta.dirname, '..', 'seeds');
export const { processors, routes } = await registerDynamicModules(import.meta.dirname);
