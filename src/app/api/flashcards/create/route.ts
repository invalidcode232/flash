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
  const formData = await req.json();

  const flashcardData: FlashcardFormData = {
    question: formData.question,
    choices: formData.choices || "[]",
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
            is_correct: choice.isCorrect === false ? false : true,
          })),
        },
      },
    });

    return new Response(JSON.stringify(createdFlashcard));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create flashcard" }),
    );
  }
}
