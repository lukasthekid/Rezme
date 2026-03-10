-- Add headshot column for user-uploaded resume photo (bytea)
ALTER TABLE "User" ADD COLUMN "headshot" BYTEA;
