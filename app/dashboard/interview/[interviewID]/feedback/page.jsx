"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, ChevronsUpDownIcon } from "lucide-react";

function Feedback({ params }) {
  const [feedback, setFeedback] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewID))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedback(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">
        🥳🙌Congratulations!!..
      </h2>
      <h2 className="font-bold text-2xl">Here is you </h2>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>3/5</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below interview question with correct answer, Your answer and
        feedback for imporvement
      </h2>

      {feedback &&
        feedback.map((item, index) => (
          <Collapsible key={index} className="mt-7">
            <CollapsibleTrigger className="p-3 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7  w-full">
              {item.question} <ChevronsUpDown className="h-5 w-5 " />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg">
                  <strong>Rating: </strong>
                  {item.rating}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                  <strong>Your answer: </strong>
                  {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                  <strong>Correct answer: </strong>
                  {item.correctans}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                  <strong>Feedback: </strong>
                  {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

      <Button
        onClick={() => router.replace("/dashboard ")}
        className="flex justify-center items-center mx-auto mt-5 font-bold bg-gray-500 text-white hover:bg-gray-600 transition-transform transform hover:scale-105 px-6 py-3 rounded-lg"
      >
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
