* `pre`: Functions that runs right after the order
entity has been created (but before it's persisted
into the database).
Use this to add discounts to perform any
additional modifications before the order is created.

* `post`: Functions that runs after the order has been
finished (paid)