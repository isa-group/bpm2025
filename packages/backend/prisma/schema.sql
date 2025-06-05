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
	"paid" TEXT,
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

DROP VIEW IF EXISTS unique_full_order_details;
CREATE VIEW unique_full_order_details AS 
WITH filtered_data AS (
  SELECT 
    t.*
  FROM full_order_details t
  WHERE 
    -- If the user has at least one paid row, include only the paid rows
    (
      EXISTS (
        SELECT 1 
        FROM full_order_details y
        WHERE y."User ID" = t."User ID" 
          AND y.paid IS NOT NULL
      )
      AND t.paid IS NOT NULL
    )
    OR
    -- If the user has no paid row, include only the newest row(s)
    (
      NOT EXISTS (
        SELECT 1
        FROM full_order_details z 
        WHERE z."User ID" = t."User ID" 
          AND z.paid IS NOT NULL
      )
      AND t."Created at" = (
        SELECT MAX(datetime(u."Created at"))
        FROM full_order_details u
        WHERE u."User ID" = t."User ID" 
      )
    )
),
user_totals AS (
  SELECT 
    "User ID",
    COUNT(*) AS total_rows
  FROM full_order_details
  GROUP BY "User ID"
),
user_returned AS (
  SELECT 
    "User ID",
    COUNT(*) AS returned_rows
  FROM filtered_data
  GROUP BY "User ID"
)
SELECT 
  f.*,
  (ut.total_rows - ur.returned_rows) AS "Number of other orders from this user"
FROM filtered_data f
JOIN user_totals ut ON f."User ID" = ut."User ID"
JOIN user_returned ur ON f."User ID" = ur."User ID";

DROP TRIGGER IF EXISTS update_user_timestamp;
CREATE TRIGGER update_user_timestamp
AFTER UPDATE ON "user"
FOR EACH ROW
BEGIN
  UPDATE "user"
  SET updatedAt = CURRENT_TIMESTAMP
  WHERE _id = NEW._id;
END;

DROP TRIGGER IF EXISTS update_order_timestamp;
CREATE TRIGGER update_order_timestamp
AFTER UPDATE ON "order"
FOR EACH ROW
BEGIN
  UPDATE "order"
  SET updatedAt = CURRENT_TIMESTAMP
  WHERE _id = NEW._id;
END;

DROP TRIGGER IF EXISTS prevent_insert_if_paid_exists;
CREATE TRIGGER prevent_insert_if_paid_exists
BEFORE INSERT ON "order"
FOR EACH ROW
WHEN EXISTS (
  SELECT 1 FROM "order"
    WHERE user_id = NEW.user_id
      AND paid IS NOT NULL
      AND product_id = NEW.product_id
)
BEGIN
  SELECT RAISE(FAIL, 'Insert rejected on order: another row with same user_id and product_id combination has non-null paid');
END;

DROP TRIGGER IF EXISTS prevent_update_if_paid_exists;
CREATE TRIGGER prevent_update_if_paid_exists
BEFORE UPDATE ON "order"
FOR EACH ROW
WHEN NEW.paid IS NOT NULL AND EXISTS (
  SELECT 1 FROM "order"
    WHERE user_id = NEW.user_id
      AND paid IS NOT NULL
      AND product_id = NEW.product_id
      AND _id != OLD._id  -- prevent self-checking
)
BEGIN
  SELECT RAISE(FAIL, 'Update rejected on order: another row with same user_id and product_id combination has non-null paid');
END;

COMMIT;
