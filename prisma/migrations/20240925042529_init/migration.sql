-- CreateEnum
CREATE TYPE "PeriodType" AS ENUM ('VOTE', 'PRE', 'POST', 'EVAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "voted" BOOLEAN NOT NULL DEFAULT false,
    "donePre" BOOLEAN NOT NULL DEFAULT false,
    "donePost" BOOLEAN NOT NULL DEFAULT false,
    "doneEval" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT true,
    "type" "PeriodType" NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seminar" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "periodId" TEXT NOT NULL,

    CONSTRAINT "Seminar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionPre" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "correct" INTEGER NOT NULL,
    "seminarId" TEXT,

    CONSTRAINT "QuestionPre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionPost" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "correct" INTEGER NOT NULL,
    "seminarId" TEXT,

    CONSTRAINT "QuestionPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionEval" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "seminarId" TEXT,

    CONSTRAINT "QuestionEval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Seminar_title_key" ON "Seminar"("title");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionPre_question_key" ON "QuestionPre"("question");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionPost_question_key" ON "QuestionPost"("question");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionEval_question_key" ON "QuestionEval"("question");

-- AddForeignKey
ALTER TABLE "Seminar" ADD CONSTRAINT "Seminar_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionPre" ADD CONSTRAINT "QuestionPre_seminarId_fkey" FOREIGN KEY ("seminarId") REFERENCES "Seminar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionPost" ADD CONSTRAINT "QuestionPost_seminarId_fkey" FOREIGN KEY ("seminarId") REFERENCES "Seminar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionEval" ADD CONSTRAINT "QuestionEval_seminarId_fkey" FOREIGN KEY ("seminarId") REFERENCES "Seminar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
