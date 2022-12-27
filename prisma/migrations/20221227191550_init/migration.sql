-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "video_id" INTEGER NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Video_video_id_key" ON "Video"("video_id");
