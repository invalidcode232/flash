import prisma from "@/lib/prisma";
import { Difficulty } from "@/lib/utils";

export async function POST(req: Request) {
  const { isCorrect, flashcardId, difficulty } = await req.json();

  const nextDate = new Date();
  if (isCorrect) {
    if (difficulty === Difficulty.EASY) {
      nextDate.setDate(nextDate.getDate() + 3);
    }
    if (difficulty === Difficulty.MEDIUM) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    if (difficulty === Difficulty.HARD) {
      nextDate.setHours(nextDate.getHours() + 6);
    }
  } else {
    nextDate.setDate(nextDate.getDate() + 1);
  }

  const flashcard = await prisma.flashcard.update({
    where: {
      id: flashcardId,
    },
    data: {
      next_date: nextDate,
    },
  });

  return new Response(JSON.stringify(flashcard));
}
