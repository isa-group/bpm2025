The modules included here will be auto-imported on application start.

Simply drop your module here and everything will be registered on application start.
You can also remove all the logic that it's not applicable to your current use-case.

TypeScript and JavaScript ESM (not CommonJS!) modules are supported.

---

This folder contains the logic that get executed when
the server receives requests (also known as "route handlers").

Your file must import `router` from `app.ts`, like this:

```typescript
import { router } from '../app.ts';

router.get('/',
    ....
)

// The rest of the custom handlers you want to register
```
