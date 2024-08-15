/*
  Warnings:

  - You are about to drop the column `twitter` on the `GithubUser` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `GithubUser` table. All the data in the column will be lost.
  - Added the required column `githubId` to the `GithubUser` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GithubUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "githubId" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "email" TEXT,
    "location" TEXT,
    "company" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GithubUser" ("avatarUrl", "bio", "company", "createdAt", "email", "id", "location", "login", "name", "updatedAt") SELECT "avatarUrl", "bio", "company", "createdAt", "email", "id", "location", "login", "name", "updatedAt" FROM "GithubUser";
DROP TABLE "GithubUser";
ALTER TABLE "new_GithubUser" RENAME TO "GithubUser";
CREATE UNIQUE INDEX "GithubUser_githubId_key" ON "GithubUser"("githubId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
