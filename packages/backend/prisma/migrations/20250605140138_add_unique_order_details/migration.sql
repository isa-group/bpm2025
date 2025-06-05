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
