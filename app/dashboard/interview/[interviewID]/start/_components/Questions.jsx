import React from "react";
import { Lightbulb } from "lucide-react";
import { Volume2 } from "lucide-react";
function Questions({ mockInterviewQuestions, activeQuestion }) {
  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser doesn't support text to speech");
    }
  };

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, index) => (
            <h2
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer font-semibold ${
                activeQuestion === index
                  ? "bg-blue-500 text-white"
                  : "bg-secondary text-gray-600"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
      </div>
      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestions[activeQuestion]?.question}
      </h2>
      <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeach(mockInterviewQuestions[activeQuestion]?.question)
        }
      />
      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-700">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm my-2  text-blue-700">
          {process.env.NEXT_PUBLIC_NOTE}
        </h2>
      </div>
    </div>
  );
}

export default Questions;
