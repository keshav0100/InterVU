"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webcam, setWebcam] = useState(false);
  useEffect(() => {
    console.log(params);
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewID));

    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position : </strong>
              {interviewData ? interviewData.jobPosition : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack : </strong>
              {interviewData ? interviewData.jobDesc : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience : </strong>
              {interviewData ? interviewData.jobExperience : "Loading..."}
            </h2>
          </div>
          <div className="p-5 border rounded-lg">
            <h2 className="flex gap-2 items-center">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          {webcam ? (
            <Webcam
              onUserMedia={() => setWebcam(true)}
              onUserMediaError={() => setWebcam(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="my-8 h-72 w-full p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                onClick={() => setWebcam(true)}
                className="w-full"
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewID + "/start"}>
          <Button className="mt-3">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;

// "use client";
// import { db } from "@/utils/db";
// import { mockInterview } from "@/utils/schema";
// import { eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import Webcam from "react-webcam";
// import { WebcamIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Lightbulb } from "lucide-react";
// import Link from "next/link";
// import { use } from "react";

// function Interview({ params: asyncParams }) {
//   const params = use(asyncParams); // Unwrap params

//   const [interviewData, setInterviewData] = useState();
//   const [webcam, setWebcam] = useState(false);

//   useEffect(() => {
//     if (!params || !params.interviewID) return; // Prevent unnecessary calls
//     console.log(params);
//     GetInterviewDetails();
//   }, [params?.interviewID]); // Dependency array remains constant

//   const GetInterviewDetails = async () => {
//     try {
//       const result = await db
//         .select()
//         .from(mockInterview)
//         .where(eq(mockInterview.mockId, params.interviewID));

//       setInterviewData(result[0]);
//     } catch (error) {
//       console.error("Error fetching interview details:", error);
//     }
//   };

//   return (
//     <div className="my-10 flex justify-center flex-col items-center">
//       <h2 className="font-bold text-2xl">Let's Get Started</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div className="flex flex-col my-5 gap-5 ">
//           <div className="flex flex-col p-5 rounded-lg border gap-5">
//             <h2 className="text-lg">
//               <strong>Job Role/Job Position : </strong>
//               {interviewData ? interviewData.jobPosition : "Loading..."}
//             </h2>
//             <h2 className="text-lg">
//               <strong>Job Description/Tech Stack : </strong>
//               {interviewData ? interviewData.jobDesc : "Loading..."}
//             </h2>
//             <h2 className="text-lg">
//               <strong>Years of Experience : </strong>
//               {interviewData ? interviewData.jobExperience : "Loading..."}
//             </h2>
//           </div>
//           <div className="p-5 border rounded-lg">
//             <h2 className="flex gap-2 items-center">
//               <Lightbulb />
//               <strong>Information</strong>
//             </h2>
//             <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
//           </div>
//         </div>
//         <div>
//           {webcam ? (
//             <Webcam
//               onUserMedia={() => setWebcam(true)}
//               onUserMediaError={() => setWebcam(false)}
//               mirrored={true}
//               style={{
//                 height: 300,
//                 width: 300,
//               }}
//             />
//           ) : (
//             <>
//               <WebcamIcon className="my-8 h-72 w-full p-20 bg-secondary rounded-lg border" />
//               <Button
//                 variant="ghost"
//                 onClick={() => setWebcam(true)}
//                 className="w-full"
//               >
//                 Enable Web Cam and Microphone
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-end items-end">
//         <Link href={`/dashboard/interview/${params.interviewID}/start`}>
//           <Button className="mt-3">Start Interview</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Interview;
