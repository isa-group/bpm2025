-- Drop old references
DROP VIEW "full_order_details";
DROP TRIGGER "update_order_timestamp";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "paid" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("_id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_order" ("_id", "createdAt", "notes", "paid", "product_id", "updatedAt", "user_id") SELECT "_id", "createdAt", "notes", "paid", "product_id", "updatedAt", "user_id" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
UPDATE "order" SET paid = "REDSYS" WHERE paid = "1";
UPDATE "order" SET paid = NULL WHERE paid = "0";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_order_2" ON "order"("_id", "user_id", "product_id");
Pragma writable_schema=0;
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- Recreate references
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
