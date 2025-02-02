"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {
    interviewlist();
  }, [user]);
  const interviewlist = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
    console.log(result);
    setInterviews(result);
  };
  return (
    <div>
      <h2
        className="font-medium text-xl"
        style={{ fontFamily: "Comic Sans MS, cursive" }}
      >
        Previous Mock Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 lg:grid-cols-3">
        {interviews &&
          interviews.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
