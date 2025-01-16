/***
 * Gets the invoice path for a given target path, email and order_id
 * We can't default the targetPath to the global variable because it's not
 * accessible to the Node's worker scope.
 */
export const getInvoicePath = (targetPath: string, email: string, order_id: string) =>
  `${targetPath}/${email.replaceAll('.', '_')}-${order_id}.pdf`;
