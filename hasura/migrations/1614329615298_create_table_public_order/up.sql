CREATE TABLE "public"."order"("id" serial NOT NULL, "created_at" date NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));
