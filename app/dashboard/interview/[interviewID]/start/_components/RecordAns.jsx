"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAns({ mockInterviewQuestions, activeQuestion, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAns();
    }
    // if (userAnswer?.length < 10) {
    //   toast("Error while saving your answer, Please try again");
    //   return;
    // }
  }, [userAnswer]);

  const StartStopRec = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAns = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedback =
      "Question:" +
      mockInterviewQuestions[activeQuestion]?.question +
      ", User Answer: " +
      userAnswer +
      ", Depends on question and user answer depends on user answer , Please give us rating";
    const result = await chatSession.sendMessage(feedback);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(MockJsonResp);
    const JsonFeedback = JSON.parse(MockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      questionIdRef: mockInterviewQuestions[activeQuestion]?.question,
      correctans: mockInterviewQuestions[activeQuestion]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedback?.feedback,
      rating: JsonFeedback?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });
    if (resp) {
      toast("Your answer saved successfully");
    }
    setUserAnswer("");
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center mt-20 bg-secondary rounded-lg p-5">
        <Image
          src={"/webcam-svgrepo-com.svg"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
        />
        <Webcam
          mirrored={true}
          style={{
            zIndex: 10,
            width: "100%",
            height: 300,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRec}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2 font-semibold animate-pulse items-center">
            <StopCircle /> Stop Recording..
          </h2>
        ) : (
          <h2 className="text-blue-700 flex gap-2 items-center font-semibold">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show ans</Button>
    </div>
  );
}

export default RecordAns;
