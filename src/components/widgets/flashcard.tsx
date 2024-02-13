"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RadioGroup } from "@/components/ui/radio-group";
import RadioChoice from "./radiochoice";
import { Button } from "../ui/button";
import { Prisma } from "@prisma/client";
import { useState } from "react";

type FlashcardWithChoices = Prisma.FlashcardGetPayload<{
  include: {
    choices: true;
  };
}>;

const Flashcard = ({ flashcard }: { flashcard: FlashcardWithChoices }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Card className="w-screen md:w-5/6 md:px-8 lg:px-12">
      <CardHeader>
        <CardTitle className="text-2xl lg:text-4xl">
          {flashcard.question}
        </CardTitle>
        <CardDescription className="md:text-md lg:text-lg">
          Card Description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup>
          {flashcard.choices.map((choice) => (
            <RadioChoice key={choice.id} id={choice.id} label={choice.choice} />
          ))}
        </RadioGroup>

        {!showAnswer && (
          <Button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-4 w-full bg-blue-500 py-3 hover:bg-blue-600"
          >
            Show Answer
          </Button>
        )}

        {showAnswer && (
          <div>
            {flashcard.choices.map(
              (choice) =>
                choice.is_correct && (
                  <p key={choice.id} className="mt-4 text-green-500">
                    Correct Answer: {choice.choice}
                  </p>
                ),
            )}
            <div className="mt-4 grid-cols-3 gap-3 md:grid">
              <Button className="mb-2 w-full bg-green-500 py-3 hover:bg-green-600">
                Easy (+3 days)
              </Button>
              <Button className="mb-2 w-full bg-yellow-500 py-3 hover:bg-yellow-600">
                Had to think.. (+1 days)
              </Button>
              <Button className="mb-2 w-full bg-red-500 py-3 hover:bg-red-600">
                Hard (+6 hour)
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default Flashcard;
