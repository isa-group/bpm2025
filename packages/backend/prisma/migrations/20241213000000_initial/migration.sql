-- CreateTable
CREATE TABLE "discount" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "reduction" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "discount_order" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" TEXT NOT NULL,
    "discount_id" INTEGER NOT NULL,
    CONSTRAINT "discount_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "discount_order_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount" ("_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "order" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "paid" BOOLEAN DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("_id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "billing_address" TEXT NOT NULL,
    "institution" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_discount_1" ON "discount"("name");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_discount_order_1" ON "discount_order"("order_id", "discount_id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_order_2" ON "order"("_id", "user_id", "product_id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_product_1" ON "product"("name");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_user_1" ON "user"("email");
Pragma writable_schema=0;

-- CreateView
CREATE VIEW full_order_details AS 
SELECT 
  o._id "Order ID", 
  u._id "User ID",
  u.name "User name",
  u.email "User email",
  u.billing_address "User billing address",
  u.institution "User institution",
  o.notes "Order notes",
  p.name "Product name",
  o.paid "Paid",
  p.price - SUM(COALESCE(d.reduction, 0)) AS "Price paid (with discounts)",
  GROUP_CONCAT(d.name, ' + ') AS "Applied Discounts",
  o.createdAt "Created at"
FROM
  "order" o 
JOIN 
  "user" u ON o.user_id = u._id 
JOIN 
  "product" p ON p._id = o.product_id
LEFT JOIN 
  "discount_order" do ON o._id = do.order_id
LEFT JOIN 
  "discount" d ON do.discount_id = d._id
GROUP BY
  o._id,
  u._id,
  u.name,
  u.email,
  u.billing_address,
  u.institution,
  o.notes,
  o.paid,
  p.price,
  o.createdAt;

-- CreateTrigger
CREATE TRIGGER update_user_timestamp
AFTER UPDATE ON "user"
FOR EACH ROW
BEGIN
  UPDATE "user"
  SET updatedAt = CURRENT_TIMESTAMP
  WHERE _id = NEW._id;
END;

CREATE TRIGGER update_order_timestamp
AFTER UPDATE ON "order"
FOR EACH ROW
BEGIN
  UPDATE "order"
  SET updatedAt = CURRENT_TIMESTAMP
  WHERE _id = NEW._id;
END;
