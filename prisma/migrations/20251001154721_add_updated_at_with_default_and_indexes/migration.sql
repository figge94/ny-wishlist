-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wishlistId" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "priceInCents" INTEGER,
    CONSTRAINT "Item_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("createdAt", "done", "id", "priceInCents", "title", "url", "wishlistId") SELECT "createdAt", "done", "id", "priceInCents", "title", "url", "wishlistId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_wishlistId_idx" ON "Item"("wishlistId");
CREATE INDEX "Item_wishlistId_done_idx" ON "Item"("wishlistId", "done");
CREATE TABLE "new_Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reminder" ("createdAt", "done", "dueAt", "id", "title", "userId") SELECT "createdAt", "done", "dueAt", "id", "title", "userId" FROM "Reminder";
DROP TABLE "Reminder";
ALTER TABLE "new_Reminder" RENAME TO "Reminder";
CREATE INDEX "Reminder_userId_idx" ON "Reminder"("userId");
CREATE INDEX "Reminder_userId_dueAt_idx" ON "Reminder"("userId", "dueAt");
CREATE INDEX "Reminder_userId_done_idx" ON "Reminder"("userId", "done");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password") SELECT "createdAt", "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Wishlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Wishlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Wishlist" ("createdAt", "id", "name", "ownerId") SELECT "createdAt", "id", "name", "ownerId" FROM "Wishlist";
DROP TABLE "Wishlist";
ALTER TABLE "new_Wishlist" RENAME TO "Wishlist";
CREATE INDEX "Wishlist_ownerId_idx" ON "Wishlist"("ownerId");
CREATE UNIQUE INDEX "Wishlist_ownerId_name_key" ON "Wishlist"("ownerId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
