"use client";

import fetcher from "@/lib/utils";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import NewFlashcardForm from "@/components/widgets/newflashcardform";

const FlashcardPage = () => {
  const {
    data: flashcards,
    error,
    isLoading,
  } = useSWR("/api/flashcards/get/all", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="flex justify-between">
        <span className="text-2xl font-semibold text-black">Flashcards</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">New Flashcard..</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new flashcard</DialogTitle>
              <DialogDescription>
                Fill in the form below to add a new flashcard
              </DialogDescription>
            </DialogHeader>
            <NewFlashcardForm />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default FlashcardPage;
