"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import Questions from "./_components/Questions";
import RecordAns from "./_components/RecordAns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Start({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewID));
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestions(jsonMockResp);

    setInterviewData(result[0]);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        {/* <Questions mockinterviewQuestions={mockinterviewQuestions} /> */}
        <Questions
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestion={activeQuestion}
        />
        {/* Videos */}
        <RecordAns
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestion > 0 && (
          <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestion != mockInterviewQuestions?.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestion == mockInterviewQuestions?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Start;
