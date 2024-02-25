import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { isCorrect, flashcardId, difficulty } = await req.json();

  const nextDate = new Date();
  if (isCorrect) {
    nextDate.setDate(nextDate.getDate() + difficulty);
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
