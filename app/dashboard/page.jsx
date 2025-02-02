import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import { Dialog } from "@/components/ui/dialog";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <h2 className="text-gray-400 mt-1">
        Create and Start your AI Mock Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
      {/* Previous Interview List */}
      <InterviewList />
    </div>
  );
}

export default Dashboard;
