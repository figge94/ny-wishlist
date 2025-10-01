/*
  Warnings:

  - You are about to drop the column `email` on the `FriendRequest` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `FriendRequest` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FriendRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "FriendRequest_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FriendRequest_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FriendRequest" ("createdAt", "id") SELECT "createdAt", "id" FROM "FriendRequest";
DROP TABLE "FriendRequest";
ALTER TABLE "new_FriendRequest" RENAME TO "FriendRequest";
CREATE UNIQUE INDEX "FriendRequest_fromUserId_toUserId_key" ON "FriendRequest"("fromUserId", "toUserId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
