import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function HeaderSection({ username, setPopUp }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-[#00ed64]">
          Welcome Back, {username}
        </h1>
        <p className="text-gray-400 text-sm">
          Master Your Videos. Maximize Your Results.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#0d3446] hover:bg-[#164863] text-white px-4 py-2"
        >
          ← Back
        </Button>
        <Button
          className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622] px-4 py-2"
          onClick={() => setPopUp((prev) => ({ ...prev, uploadVideo: true }))}
        >
          Upload Video
        </Button>
      </div>
    </div>
  );
}

export default HeaderSection;
