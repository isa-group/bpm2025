DROP VIEW IF EXISTS unique_full_order_details;
CREATE VIEW unique_full_order_details AS 
SELECT
  t.*,
  (
    SELECT COUNT(*) 
    FROM full_order_details c
    WHERE c."User ID" = t."User ID"
  ) AS total_per_user
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
  );
