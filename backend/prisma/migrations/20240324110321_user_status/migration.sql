-- CreateTable
CREATE TABLE "UserStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT 'offline',
    "updated_at" DATETIME,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "UserStatus_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStatus_user_id_key" ON "UserStatus"("user_id");
