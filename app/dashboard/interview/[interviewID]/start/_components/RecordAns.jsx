"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";

function RecordAns() {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result.transcript);
    });
  }, [results]);

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
        variant="outline"
        className="my-10"
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2 font-semibold animate-pulse items-center">
            <StopCircle /> 'Stop Recording..'
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
