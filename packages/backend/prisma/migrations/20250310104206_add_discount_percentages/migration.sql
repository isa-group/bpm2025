-- Drop old references
DROP VIEW "full_order_details";
DROP TRIGGER "update_user_timestamp";
DROP TRIGGER "update_order_timestamp";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_discount" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "reduction" DECIMAL(10,2) NOT NULL,
    "is_percentage" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_discount" ("_id", "name", "reduction") SELECT "_id", "name", "reduction" FROM "discount";
DROP TABLE "discount";
ALTER TABLE "new_discount" RENAME TO "discount";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_discount_1" ON "discount"("name");
Pragma writable_schema=0;
CREATE TABLE "new_order" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("_id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_order" ("_id", "createdAt", "notes", "paid", "product_id", "updatedAt", "user_id") SELECT "_id", coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "notes", coalesce("paid", false) AS "paid", "product_id", "updatedAt", "user_id" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_order_2" ON "order"("_id", "user_id", "product_id");
Pragma writable_schema=0;
CREATE TABLE "new_product" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL
);
INSERT INTO "new_product" ("_id", "name", "price") SELECT "_id", "name", "price" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_product_1" ON "product"("name");
Pragma writable_schema=0;
CREATE TABLE "new_user" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "billing_address" TEXT NOT NULL,
    "institution" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_user" ("_id", "billing_address", "createdAt", "email", "institution", "name", "updatedAt") SELECT "_id", "billing_address", "createdAt", "email", "institution", "name", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_user_1" ON "user"("email");
Pragma writable_schema=0;
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- Recreate references
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
  CAST(
    ROUND(
      CASE 
        WHEN (p.price - SUM(CASE WHEN NOT d.is_percentage THEN COALESCE(d.reduction, 0) ELSE 0 END)) * 
             (1 - CASE 
                WHEN SUM(CASE WHEN d.is_percentage THEN COALESCE(d.reduction, 0) ELSE 0 END) > 100 THEN 1.0 
                WHEN SUM(CASE WHEN d.is_percentage THEN COALESCE(d.reduction, 0) ELSE 0 END) < 0 THEN 0.0 
                ELSE SUM(CASE WHEN d.is_percentage THEN COALESCE(d.reduction, 0) ELSE 0 END) / 100.0 
              END) < 0 
        THEN 0 
        ELSE (p.price - SUM(CASE WHEN NOT d.is_percentage THEN COALESCE(d.reduction, 0) ELSE 0 END)) * 
             (1 - CASE 
                WHEN SUM(CASE WHEN d.is_percentage THEN COALESCE(d.reduction, 0) ELSE 0 END) > 100 THEN 1.0 
                WHEN SUM(CASE WHEN d.is_percentage THEN COALESCE(d.reduction, 0) ELSE 0 END) < 0 THEN 0.0 
                ELSE SUM(CASE WHEN d.is_percentage THEN COALESCE(d.reduction, 0) ELSE 0 END) / 100.0 
              END)
      END,
      2
    ) AS NUMERIC
  ) AS "Price paid (with discounts)",
  GROUP_CONCAT(
    CASE 
      WHEN d.is_percentage THEN '|-% ' || d.name || ' -%|'
      ELSE d.name 
    END, 
    ' + '
  ) AS "Applied Discounts",
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
