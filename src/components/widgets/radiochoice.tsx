"use client";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type ChoiceData = {
  id: string;
  label: string;
};

const RadioChoice = ({ id, label }: ChoiceData) => {
  return (
    <div className="flex items-center space-x-2 rounded-md border-2 border-slate-200 p-4">
      <RadioGroupItem
        value={id}
        id={id}
        onChange={() => {
          console.log("hi");
        }}
      />
      <Label htmlFor={id} className="text-2xl">
        {label}
      </Label>
    </div>
  );
};

export default RadioChoice;
