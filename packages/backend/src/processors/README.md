The modules included here will be auto-imported on application start.

Simply drop your module here and everything will be registered on application start.
You can also remove all the logic that it's not applicable to your current use-case.

TypeScript and JavaScript ESM (not CommonJS!) modules are supported.

---

This folder contains the logic that gets executed for every order.
This allows you to apply discounts to the order.

In order to achieve that, you must make a default function export
with the following signature (the key is the discount id, the value
is the function that's going to be executed):

```typescript
/**
 * Being a TS/JS module, you can import any
 * other module you need for your processor logic,
 * like the `db` module.
 */
import type { order } from '@prisma/client';

export default (): ProcessorSignature => {
    return {
        1: (req_body: OrderPayload): boolean => {
        /**
         * This function will apply the discount with id 1
         * if it returns a truthy value.
         * 
         * You can get as parameters the created order id and the request body
         */
        },
        2: async (req_body: OrderPayload): Promise<boolean> => {
            // You can also use async functions
        },
        3: (req_body: OrderPayload): boolean => {
            ...
        }
    };
};
```
