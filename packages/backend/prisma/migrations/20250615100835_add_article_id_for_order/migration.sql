BEGIN TRANSACTION;

-- Drop old references
DROP VIEW IF EXISTS "unique_full_order_details";
DROP VIEW IF EXISTS "full_order_details";
DROP TRIGGER IF EXISTS "update_order_timestamp";
DROP TRIGGER IF EXISTS "prevent_insert_if_paid_exists";
DROP TRIGGER IF EXISTS "prevent_update_if_paid_exists";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "article_id" TEXT,
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
  o.article_id "Presented article ID",
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
  o.article_id,
  o.createdAt;

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

COMMIT;
--- As suggested: https://sqlite.org/lang_analyze.html
PRAGMA optimize;
