-- CreateTable
CREATE TABLE "Regulation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Regulation_pkey" PRIMARY KEY ("id")
);
