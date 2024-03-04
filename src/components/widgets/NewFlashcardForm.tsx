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
import { useSWRConfig } from "swr";

interface ChoiceData {
  text: string; // The text content of the choice
  isCorrect: boolean; // Whether the choice is the correct answer
}

const NewFlashcardForm = () => {
  const { fetcher, mutate } = useSWRConfig();

  // send the form data to the server
  const form = useForm();

  const control = form.control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });

  const onSubmit = async (data: ChoiceData[]) => {
    if (fetcher === undefined) return;

    console.log(data);

    await fetcher("api/flashcards/create", data);

    location.reload();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="rounded-md border-2 border-slate-200 p-4 dark:border-slate-700 dark:text-white">
          <FormItem>
            <FormLabel>Question</FormLabel>
            <FormControl className="w-full">
              <Input
                type="text"
                {...form.register("question", {
                  required: "Question text is required",
                })}
              />
            </FormControl>
          </FormItem>

          <FormControl className="mt-3">
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
                    <FormLabel className="mr-2 text-sm">Is Correct?</FormLabel>
                  </FormControl>
                  <FormControl>
                    <input
                      type="radio"
                      // name={`choice-isCorrect-${index}`}
                      // label="Is Correct?"
                      value={index.toString()}
                      key={index}
                      id={index.toString()}
                      // register={form.register}
                      {...form.register(`choices.${index}.isCorrect`)}
                    />
                  </FormControl>

                  <Button
                    type="button"
                    className="ml-2 bg-red-500 px-2 py-0 text-xs"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            type="button"
            className="my-2 bg-green-500 hover:bg-green-600 dark:text-slate-200"
            onClick={() => append({ text: "", isCorrect: false })}
          >
            Add Choice
          </Button>
        </div>
        <div className="flex justify-end">
          <Button
            className="my-3 bg-blue-500 hover:bg-blue-600 dark:text-slate-200"
            type="submit"
          >
            Add Flashcard
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewFlashcardForm;
