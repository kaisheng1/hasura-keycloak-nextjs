
DROP TRIGGER IF EXISTS "set_public_order_updated_at" ON "public"."order";
ALTER TABLE "public"."order" DROP COLUMN "updated_at";

ALTER TABLE "public"."order" DROP COLUMN "created_at";

DROP TABLE "public"."order";
