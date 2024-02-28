"use client";

import Flashcard from "@/components/widgets/flashcard";
import fetcher from "@/lib/utils";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import NewFlashcardForm from "@/components/widgets/NewFlashcardForm";

const FlashcardPage = () => {
  const {
    data: flashcard,
    error,
    isLoading,
  } = useSWR("/api/flashcards/get", fetcher);
  const router = useRouter();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const reloadPage = () => router.refresh();

  return (
    <>
      {/* <div className="w-screen">
        <NewFlashcardForm />
      </div> */}

      {flashcard && <Flashcard flashcard={flashcard} reload={reloadPage} />}
      {!flashcard && <div>You&apos;ve done all flashcards for today!</div>}
    </>
  );
};

export default FlashcardPage;
