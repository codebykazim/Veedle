import React from "react";
import GetImagePreview from "./GetImagePreview";

const FilesInfoForm = ({ control }) => {
  return (
    <div className="px-2 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00ed64] to-[#00c050]">
        Complete Your Profile
      </h1>
      <p className="text-slate-400 text-sm text-center mt-2 mb-6">
        Add your profile pictures
      </p>

      {/* Cover image with avatar */}
      <div className="relative w-full h-32 sm:h-36 bg-gradient-to-r from-[#0d3446] to-[#072331] rounded-lg mb-8 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <GetImagePreview
            name="coverImage"
            control={control}
            className="w-full h-full object-cover"
            cameraIcon={true}
            cameraSize={24}
            cameraClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <span className="absolute right-3 bottom-3 text-xs bg-black/50 px-2 py-1 rounded text-white">
          Cover Image
        </span>

        {/* Avatar */}
        <div className="absolute -bottom-0 left-4">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-[#051622] bg-[#0d3446] flex items-center justify-center">
            <GetImagePreview
              name="avatar"
              control={control}
              className="w-full h-full object-cover rounded-full"
              cameraIcon={true}
              cameraSize={20}
              cameraClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            />
          </div>
          <span className="absolute right-5.5 bottom-2 text-[10px] bg-black/50 px-1 py-0.5 rounded-xl text-white sm:right-6 sm:bottom-3 sm:text-xs sm:px-1.5 sm:py-0.5 sm:rounded-2xl">
            Avatar
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilesInfoForm;
