CREATE VIEW unique_full_order_details AS SELECT 
  t1.*,
  (
    SELECT COUNT(*) - 1
    FROM full_order_details t2
    WHERE t2."User ID" = t1."User ID"
  ) AS "Number of other orders from this user"
FROM full_order_details t1
LEFT JOIN full_order_details t2
  ON t1."User ID" = t2."User ID"
  AND 
  (
    -- Compare "priority" of T2 vs T1 based on whether paid is NOT NULL (priority = 1) or NULL (priority = 0).
    (CASE WHEN t2.paid IS NOT NULL THEN 1 ELSE 0 END) 
      > (CASE WHEN t1.paid IS NOT NULL THEN 1 ELSE 0 END)
    OR 
    (
      (CASE WHEN t2.paid IS NOT NULL THEN 1 ELSE 0 END) 
        = (CASE WHEN t1.paid IS NOT NULL THEN 1 ELSE 0 END)
      AND t2."Created at" > t1."Created at"
    )
  )
WHERE t2."User ID" IS NULL;

CREATE TRIGGER prevent_insert_if_paid_exists
BEFORE INSERT ON "order"
FOR EACH ROW
WHEN EXISTS (
    SELECT 1 FROM "order"
    WHERE user_id = NEW.user_id
      AND paid IS NOT NULL
)
BEGIN
    SELECT RAISE(FAIL, 'Insert rejected on order: another row with same user_id has non-null paid');
END;

CREATE TRIGGER prevent_update_if_paid_exists
BEFORE UPDATE ON "order"
FOR EACH ROW
WHEN EXISTS (
    SELECT 1 FROM "order"
    WHERE user_id = NEW.user_id
      AND paid IS NOT NULL
      AND _id != OLD._id  -- prevent self-checking
)
BEGIN
    SELECT RAISE(FAIL, 'Update rejected on order: another row with same user_id has non-null paid');
END;