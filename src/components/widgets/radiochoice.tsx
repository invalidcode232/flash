"use client";
import { RadioGroupItem } from "../ui/radio-group";
import { FormLabel } from "../ui/form";

type ChoiceData = {
  id: string;
  value: string;
  label: string;
};

const RadioChoice = ({ id, label, value }: ChoiceData) => {
  return (
    <div className="flex items-center space-x-2 rounded-md border-2 border-slate-200 p-4">
      <RadioGroupItem value={value} />
      <FormLabel htmlFor={id} className="text-2xl">
        {label}
      </FormLabel>
    </div>
  );
};

export default RadioChoice;
