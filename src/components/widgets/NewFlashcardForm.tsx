import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "../ui/radio-group";
import RadioChoice from "./radiochoice";

interface ChoiceData {
  text: string; // The text content of the choice
  isCorrect: boolean; // Whether the choice is the correct answer
}

const NewFlashcardForm = () => {
  const form = useForm();

  const control = form.control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });

  const onSubmit = (data: ChoiceData[]) => {
    console.log("Submitted Choices:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormItem>
            <FormLabel>Question</FormLabel>
            <FormControl>
              <Input
                type="text"
                {...form.register("question", {
                  required: "Question text is required",
                })}
              />
            </FormControl>
          </FormItem>

          <FormControl>
            <RadioGroup>
              {fields.map((field, index) => (
                <FormItem key={field.id}>
                  <FormControl>
                    <FormLabel>Choice {index + 1}</FormLabel>
                  </FormControl>
                  <FormControl>
                    <Input
                      type="text"
                      {...form.register(`choices.${index}.text`, {
                        required: "Choice text is required",
                      })}
                    />
                  </FormControl>

                  <FormControl>
                    <RadioChoice
                      // type="radio"
                      // name={`choice-isCorrect-${index}`}
                      label="Is Correct?"
                      value={index.toString()}
                      key={index}
                      id={index.toString()}
                      // {...form.register(`choices.${index}.isCorrect`)}
                    />
                  </FormControl>

                  <Button
                    type="button"
                    className="ml-2 bg-red-500 text-sm"
                    onClick={() => remove(index)}
                  >
                    Remove Choice
                  </Button>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            type="button"
            className="my-2 bg-green-500"
            onClick={() => append({ text: "", isCorrect: false })}
          >
            Add Choice
          </Button>
        </div>
        <Button type="submit">Submit Choices</Button>
      </form>
    </Form>
  );
};

export default NewFlashcardForm;
