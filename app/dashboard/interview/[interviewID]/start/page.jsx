"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import Questions from "./_components/Questions";
import RecordAns from "./_components/RecordAns";

function Start({ params }) {
  const [interviewdata, setInterviewData] = useState();
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Questions */}
      {/* <Questions mockinterviewQuestions={mockinterviewQuestions} /> */}
      <Questions
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestion={activeQuestion}
      />
      {/* Videos */}
      <RecordAns />
    </div>
  );
}

export default Start;
