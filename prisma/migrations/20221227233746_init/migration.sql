/*
  Warnings:

  - You are about to drop the column `video_id` on the `Video` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "search_term" TEXT,
    "reddit_id" TEXT,
    "reddit_title" TEXT,
    "reddit_content" TEXT,
    "reddit_comments" TEXT,
    "script" TEXT,
    "thumbnail" TEXT,
    "trailer_url" TEXT,
    "status_step" INTEGER,
    "status" TEXT,
    "youtube_url" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Video" ("created_at", "id", "reddit_comments", "reddit_content", "reddit_id", "reddit_title", "script", "search_term", "status", "status_step", "thumbnail", "title", "trailer_url", "updated_at", "youtube_url") SELECT "created_at", "id", "reddit_comments", "reddit_content", "reddit_id", "reddit_title", "script", "search_term", "status", "status_step", "thumbnail", "title", "trailer_url", "updated_at", "youtube_url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
