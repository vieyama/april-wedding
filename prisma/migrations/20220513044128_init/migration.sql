-- CreateTable
CREATE TABLE "guest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "countGuest" INTEGER,
    "join" BOOLEAN DEFAULT false
);
