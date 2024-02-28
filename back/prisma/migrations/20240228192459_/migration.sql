-- CreateTable
CREATE TABLE "inviteToPlay" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inviteToPlay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inviteToPlay" ADD CONSTRAINT "inviteToPlay_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inviteToPlay" ADD CONSTRAINT "inviteToPlay_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
