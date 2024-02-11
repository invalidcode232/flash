import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RadioChoice from "./radiochoice";
import { Button } from "../ui/button";

type FlashcardData = {
  question: string;
  answer: string;
};

const Flashcard = ({ question, answer }: FlashcardData) => {
  return (
    <Card className="w-screen md:w-4/5 md:px-8 lg:px-12">
      <CardHeader>
        <CardTitle className="text-2xl lg:text-4xl">{question}</CardTitle>
        <CardDescription className="md:text-md lg:text-lg">
          Card Description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup>
          <RadioChoice id="1" label="2" />
          <RadioChoice id="2" label="5" />
        </RadioGroup>

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
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default Flashcard;
