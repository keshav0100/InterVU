// "use client";
// import React, { use, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { LoaderCircle } from "lucide-react";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { v4 as uuidv4 } from "uuid";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";
// import { useRouter } from "next/navigation";

// function AddNewInterview() {
//   const [openDialog, setopenDialog] = useState(false);
//   const [jobPosition, setJobPosition] = useState();
//   const [jobDesc, setJobDesc] = useState();
//   const [jobExperience, setJobExperience] = useState();
//   const [loading, setLoading] = useState(false);
//   const [jsonResponse, setjsonResponse] = useState([]);
//   const router = useRouter();
//   const { user } = useUser();

//   const onSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     console.log(jobPosition, jobDesc, jobExperience);

//     const InputPrompt =
//       "Job Position: " +
//       jobPosition +
//       ", Job Description: " +
//       jobDesc +
//       ", Years of Experience: " +
//       jobExperience +
//       ", Depends on Job Position,Job Description,Years of Experience give us " +
//       process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
//       " interview questions along with answers in JSON format ";

//     const result = await chatSession.sendMessage(InputPrompt);
//     const MockJsonResp = result.response
//       .text()
//       .replace("```json", "")
//       .replace("```", "");
//     console.log(JSON.parse(MockJsonResp));
//     setjsonResponse(MockJsonResp);

//     if (MockJsonResp) {
//       const resp = await db
//         .insert(MockInterview)
//         .values({
//           mockId: uuidv4(),
//           jsonMockResp: MockJsonResp,
//           jobPosition: jobPosition,
//           jobDesc: jobDesc,
//           jobExperience: jobExperience,
//           createdBy: user?.primaryEmailAddress?.emailAddress,
//           createdAt: moment().format("DD-MM-yyyy HH:mm:ss"),
//         })
//         .returning({ mockId: MockInterview.mockId });
//       console.log("Inserted ID:", resp);
//       if (resp) {
//         setopenDialog(false);
//         router.push("/dashboard/interview/" + resp[0]?.mockId);
//       }
//     } else {
//       console.log("ERROR");
//     }
//     setLoading(false);
//   };
//   return (
//     <div>
//       <div
//         className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
//         onClick={() => setopenDialog(true)}
//       >
//         <h2 className="font-bold text-lg text-center w-full">+ Add New</h2>
//       </div>
//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-2xl">
//               Tell us about your job interview.
//             </DialogTitle>
//             <DialogDescription>
//               <form onSubmit={onSubmit}>
//                 <div>
//                   <h2>
//                     Add details about your job position/role, job description
//                   </h2>
//                   <div className="mt-5 my-2">
//                     <label>Job Role/Job Position</label>
//                     <Input
//                       placeholder="Ex. Full Stack, AI/ML"
//                       required
//                       onChange={(event) => setJobPosition(event.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Job Description/ Tech Stack</label>
//                     <Textarea
//                       placeholder="Eg. React, NodeJs, Angular"
//                       required
//                       onChange={(event) => setJobDesc(event.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Years of Experience</label>
//                     <Input
//                       placeholder="Ex. 5"
//                       type="number"
//                       max="100"
//                       min="0"
//                       required
//                       onChange={(event) => setJobExperience(event.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-3 justify-end">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => setopenDialog(false)}
//                     style={{ fontWeight: 900 }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     style={{ fontWeight: 900 }}
//                     type="submit"
//                     disabled={loading}
//                     className="bg-black text-white hover:bg-gray-500 transition-transform transform hover:scale-105"
//                   >
//                     {loading ? (
//                       <>
//                         <LoaderCircle className="animate-spin" />
//                         'Generating from AI'
//                       </>
//                     ) : (
//                       "Start Interview"
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddNewInterview;

// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { LoaderCircle } from "lucide-react";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { v4 as uuidv4 } from "uuid";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";
// import { useRouter } from "next/navigation";

// function AddNewInterview() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [jobPosition, setJobPosition] = useState();
//   const [jobDesc, setJobDesc] = useState();
//   const [jobExperience, setJobExperience] = useState();
//   const [loading, setLoading] = useState(false);
//   const [jsonResponse, setJsonResponse] = useState([]);
//   const router = useRouter();
//   const { user } = useUser();

//   const onSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     console.log(jobPosition, jobDesc, jobExperience);

//     const InputPrompt =
//       "Job Position: " +
//       jobPosition +
//       ", Job Description: " +
//       jobDesc +
//       ", Years of Experience: " +
//       jobExperience +
//       ", Depends on Job Position,Job Description,Years of Experience give us " +
//       process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
//       " interview questions along with answers in JSON format ";

//     const result = await chatSession.sendMessage(InputPrompt);
//     const MockJsonResp = result.response
//       .text()
//       .replace("```json", "")
//       .replace("```", "");
//     console.log(JSON.parse(MockJsonResp));
//     setJsonResponse(MockJsonResp);

//     if (MockJsonResp) {
//       const resp = await db
//         .insert(MockInterview)
//         .values({
//           mockId: uuidv4(),
//           jsonMockResp: MockJsonResp,
//           jobPosition: jobPosition,
//           jobDesc: jobDesc,
//           jobExperience: jobExperience,
//           createdBy: user?.primaryEmailAddress?.emailAddress,
//           createdAt: moment().format("DD-MM-yyyy HH:mm:ss"),
//         })
//         .returning({ mockId: MockInterview.mockId });
//       console.log("Inserted ID:", resp);
//       if (resp) {
//         setOpenDialog(false);
//         router.push("/dashboard/interview/" + resp[0]?.mockId);
//       }
//     } else {
//       console.log("ERROR");
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <div
//         className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
//         onClick={() => setOpenDialog(true)}
//       >
//         <h2 className="font-bold text-lg text-center w-full">+ Add New</h2>
//       </div>
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-2xl">
//               Tell us about your job interview.
//             </DialogTitle>
//             <DialogDescription>
//               <form onSubmit={onSubmit}>
//                 <div>
//                   <h2>
//                     Add details about your job position/role, job description
//                   </h2>
//                   <div className="mt-5 my-2">
//                     <label>Job Role/Job Position</label>
//                     <Input
//                       placeholder="Ex. Full Stack, AI/ML"
//                       required
//                       onChange={(event) => setJobPosition(event.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Job Description/ Tech Stack</label>
//                     <Textarea
//                       placeholder="Eg. React, NodeJs, Angular"
//                       required
//                       onChange={(event) => setJobDesc(event.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Years of Experience</label>
//                     <Input
//                       placeholder="Ex. 5"
//                       type="number"
//                       max="100"
//                       min="0"
//                       required
//                       onChange={(event) => setJobExperience(event.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-3 justify-end">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => setOpenDialog(false)}
//                     style={{ fontWeight: 900 }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     style={{ fontWeight: 900 }}
//                     type="submit"
//                     disabled={loading}
//                     className="bg-black text-white hover:bg-gray-500 transition-transform transform hover:scale-105"
//                   >
//                     {loading ? (
//                       <>
//                         <LoaderCircle className="animate-spin" />
//                         'Generating from AI'
//                       </>
//                     ) : (
//                       "Start Interview"
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddNewInterview;
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience +
      ", Depends on Job Position,Job Description,Years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview questions along with answers in JSON format ";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy HH:mm:ss"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log("Inserted ID:", resp);
      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <h2
          className="font-bold text-lg text-center w-full"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          + Add New
        </h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className="text-2xl"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              }}
            >
              Tell us about your job interview.
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    }}
                  >
                    Add details about your job position/role, job description
                  </h2>
                  <div className="mt-5 my-2">
                    <label
                      style={{
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      }}
                    >
                      Job Role/Job Position
                    </label>
                    <Input
                      placeholder="Ex. Full Stack, AI/ML"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                      style={{
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label
                      style={{
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      }}
                    >
                      Job Description/ Tech Stack
                    </label>
                    <Textarea
                      placeholder="Eg. React, NodeJs, Angular"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                      style={{
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label
                      style={{
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      }}
                    >
                      Years of Experience
                    </label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="100"
                      min="0"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                      style={{
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    style={{
                      fontWeight: 900,
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{
                      fontWeight: 900,
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    }}
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white hover:bg-gray-500 transition-transform transform hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
