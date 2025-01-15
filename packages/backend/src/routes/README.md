The modules included here will be auto-imported on application start.

Simply drop your module here and everything will be registered on application start.
You can also remove all the logic that it's not applicable to your current use-case.

TypeScript and JavaScript ESM (not CommonJS!) modules are supported.

---

This folder contains the logic that get executed when
the server receives requests (also known as "route handlers").

Your file must import `router` from `app.ts`, like this:

```typescript
import { router } from '#/app.ts';

router.get('/',
    // This handler gets executed for GET requests at /
    ....
)

router.post('/test',
    // This handler gets executed for POST requests at /test
    ....
)

// The rest of the custom handlers you want to register
```

See https://h3.unjs.io/guide/router for more information
