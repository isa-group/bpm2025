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