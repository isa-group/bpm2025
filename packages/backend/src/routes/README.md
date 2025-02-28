The modules included here will be auto-imported on application start.

Simply drop your module here and everything will be registered on application start.
You can also remove all the logic that it's not applicable to your current use-case.

TypeScript and JavaScript ESM (not CommonJS!) modules are supported.

---

This folder contains the logic that get executed when
the server receives requests (also known as "route handlers").

Your file must contain a default function export. The fastify instance will be passed as the first argument.
For more details, please see [Fastify documentation](https://fastify.dev/docs/latest/Reference/Plugins/#create-a-plugin)

```typescript
import type { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
  router.get('/', async () => {
    // This handler gets executed for GET requests at /
    ....
  })

  router.get('/', async () => {
    // This handler gets executed for POST requests at /test
    ....
  })
  // The rest of the custom handlers you want to register
}
```

See https://h3.unjs.io/guide/router for more information
