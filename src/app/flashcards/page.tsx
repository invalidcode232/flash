"use client";

import Flashcard from "@/components/widgets/flashcard";
import fetcher from "@/lib/utils";
import useSWR from "swr";

const FlashcardPage = () => {
  const { data: flashcard, error, isLoading } = useSWR("/api/get", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex justify-center">
      <Flashcard flashcard={flashcard} />
    </div>
  );
};

export default FlashcardPage;
