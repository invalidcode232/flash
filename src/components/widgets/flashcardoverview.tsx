import { Flashcard, Prisma } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  flashcard: Prisma.FlashcardGetPayload<{
    include: {
      choices: true;
    };
  }>;
};

const prettyDate = (date: Date) => {
  const split_date = date.toString().split("T");

  if (split_date.length < 2) {
    return "No date";
  }

  return split_date[0] + " " + split_date[1].split(".")[0];
};

const FlashcardOverview = ({ flashcard }: Props) => {
  console.log(flashcard);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{flashcard.question}</CardTitle>
        <CardDescription>
          {/* Next date: {flashcard.next_date.toString().split("T")[0]} */}
          Next date: {prettyDate(flashcard.next_date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {flashcard.choices.map((choice) => (
          <div
            key={choice.id}
            className={`my-1 rounded-sm ${choice.is_correct ? "bg-green-100" : "bg-slate-100"} p-1`}
          >
            {choice.choice}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FlashcardOverview;
