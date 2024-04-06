CREATE TABLE "day_completed" (
    "id" bigserial NOT NULL,
    "habit_id" BIGINT NOT NULL,
    "date" VARCHAR(255) NOT NULL ,
    "created_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
ALTER TABLE "day_completed" ADD CONSTRAINT pk_day_completed PRIMARY KEY ("habit_id", "date");


CREATE TABLE "todo" (
    "id" bigserial NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "term" VARCHAR(255) NOT NULL ,
    "completed" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP,
    "user_id" BIGINT NOT NULL
);
ALTER TABLE "todo" ADD PRIMARY KEY("id");

CREATE TABLE "event"(
    "id" bigserial NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "frequency" VARCHAR(255) NOT NULL,
    "begin_time" VARCHAR(255) NOT NULL, 
    "end_time" VARCHAR(255) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP,
    "frequency_extension" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "event" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "event"."frequency" IS 'Single| Monthly | Annualy | Weekly';

CREATE TABLE "habit" (
    "id" bigserial NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "streak" BIGINT NOT NULL DEFAULT 0,
    "week_days" VARCHAR(255) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE "habit" ADD PRIMARY KEY("id");

CREATE TABLE "user" (
    "id" bigserial NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) WITH TIME zone DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE "user" ADD PRIMARY KEY("id");
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");

ALTER TABLE "habit" ADD CONSTRAINT "habit_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE "day_completed" ADD CONSTRAINT "day_completed_habit_id_foreign" FOREIGN KEY("habit_id") REFERENCES "habit"("id");
ALTER TABLE "event" ADD CONSTRAINT "event_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE "todo" ADD CONSTRAINT "todo_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");

