import prisma from "@/lib/prisma";

interface ChoiceData {
  text: string;
  isCorrect: boolean;
}

interface FlashcardFormData {
  question: string;
  choices: ChoiceData[];
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const flashcardData: FlashcardFormData = {
    question: formData.get("question") as string,
    choices: JSON.parse((formData.get("choices") as string) || "[]"),
  };

  if (!flashcardData.question || !flashcardData.choices.length) {
    return JSON.stringify({ error: "Question and choices are required" });
  }

  try {
    const createdFlashcard = await prisma.flashcard.create({
      data: {
        question: flashcardData.question,
        next_date: new Date(),
        choices: {
          create: flashcardData.choices.map((choice) => ({
            choice: choice.text,
            is_correct: choice.isCorrect,
          })),
        },
      },
    });

    return JSON.stringify(createdFlashcard);
  } catch (error) {
    console.error(error);
    return JSON.stringify({ error: "Failed to create flashcard" });
  }
}
