/*
  Warnings:

  - Added the required column `avatar` to the `ChatGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatGroup" ADD COLUMN     "avatar" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "chatGroupId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserGroup" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGroup_AB_unique" ON "_UserGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGroup_B_index" ON "_UserGroup"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatGroupId_fkey" FOREIGN KEY ("chatGroupId") REFERENCES "ChatGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroup" ADD CONSTRAINT "_UserGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroup" ADD CONSTRAINT "_UserGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
