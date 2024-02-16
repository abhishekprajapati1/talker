/*
  Warnings:

  - Added the required column `conversation_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "body" TEXT NOT NULL,
    "timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "status" TEXT DEFAULT 'notdelivered',
    "type" TEXT DEFAULT 'text',
    "sender_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("body", "id", "sender_id", "status", "timestamp", "type", "updated_at") SELECT "body", "id", "sender_id", "status", "timestamp", "type", "updated_at" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
