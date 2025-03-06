-- This file is provided just for reference and testing purposes. It is not used by Prisma.
-- For generating the database, run `npm run migrate` instead. The initial migration
-- of Prisma equals to the database schema defined in this file.

BEGIN TRANSACTION;
DROP TABLE IF EXISTS "discount";
CREATE TABLE "discount" (
	"_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT UNIQUE NOT NULL,
	"reduction"	DECIMAL(10,2) NOT NULL
);
DROP TABLE IF EXISTS "discount_order";
CREATE TABLE "discount_order" (
	"_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"order_id"	TEXT NOT NULL,
	"discount_id"	INTEGER NOT NULL,
	UNIQUE("order_id","discount_id"),
	FOREIGN KEY("discount_id") REFERENCES "discount"("_id") ON DELETE CASCADE,
	FOREIGN KEY("order_id") REFERENCES "order"("_id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE IF EXISTS "order";
CREATE TABLE "order" (
	"_id"	TEXT PRIMARY KEY,
	"user_id"	INTEGER NOT NULL,
	"product_id"	INTEGER NOT NULL,
	"paid"	BOOLEAN DEFAULT FALSE,
	"notes"	TEXT,
	"createdAt"	DATETIME DEFAULT CURRENT_TIMESTAMP,
	"updatedAt"	DATETIME,
	UNIQUE("_id", "user_id","product_id"),
	FOREIGN KEY("product_id") REFERENCES "product"("_id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("user_id") REFERENCES "user"("_id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "product";
CREATE TABLE "product" (
	"_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT UNIQUE NOT NULL,
	"price"	DECIMAL(10,2) NOT NULL
);
DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
	"_id"				INTEGER PRIMARY KEY AUTOINCREMENT,
	"email"				TEXT UNIQUE NOT NULL,
	"name"				TEXT NOT NULL,
	"billing_address"	TEXT NOT NULL,
	"institution"		TEXT,
	"createdAt"			DATETIME DEFAULT CURRENT_TIMESTAMP,
	"updatedAt"			DATETIME
);
DROP VIEW IF EXISTS "full_order_details";
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

COMMIT;
