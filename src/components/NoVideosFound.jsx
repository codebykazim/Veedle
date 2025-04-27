import { PlayCircle } from "lucide-react";

function NoVideosFound({ text }) {
  return (
    <div className="flex flex-col items-center justify-center text-white min-h-[50vh] py-16">
      <div className="bg-[#072331]/50 p-8 rounded-lg border border-[#1e3a47] flex flex-col items-center">
        <PlayCircle size={60} className="text-[#00ed64] mb-4" />
        <p className="text-xl font-medium">No videos found</p>
        <p className="text-slate-400 mt-2 text-center max-w-md">
          {text || "There are no videos available here at the moment."}
        </p>
      </div>
    </div>
  );
}

export default NoVideosFound;
