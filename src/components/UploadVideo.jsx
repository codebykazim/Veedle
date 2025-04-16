import React, { useState } from "react";
import { Input, UploadingVideo } from "./index";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { publishAvideo } from "../store/videoSlice";
import { IoCloseCircleOutline } from "./icons";
import GetImagePreview from "./GetImagePreview";

function UploadVideo({ setUploadVideoPopup }) {
  const [videoName, setVideoName] = useState("");
  const [videoSize, setVideoSize] = useState(0);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const uploaded = useSelector((state) => state.video.uploaded);

  const publishVideo = async (data) => {
    console.log("Form data being submitted:", data);
    console.log("Video file:", data.videoFile?.[0]);
    console.log("Thumbnail:", data.thumbnail?.[0]);

    setVideoSize(Math.floor(data.videoFile[0].size / (1024 * 1024)));
    await dispatch(publishAvideo(data));
};
if (uploaded) {
  return (
    <UploadingVideo
      setUploadVideoPopup={setUploadVideoPopup}
      videoFileName={videoName}
      fileSize={videoSize}
      uploaded
    />
  );
}


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 p-4">
      <div className="bg-[#222222] border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(publishVideo)}>
          <div className="sticky top-0 bg-[#222222] border-b border-gray-700 p-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <IoCloseCircleOutline
                size={24}
                onClick={() => setUploadVideoPopup(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              />
              <h3 className="text-xl font-bold">Upload Video</h3>
            </div>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Save"}
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
              <div className="mb-4">
                <h1 className="font-medium">
                  Drag and drop video files to upload
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Your videos will be private until you publish them
                </p>
              </div>
              <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg inline-block">
                Select Files
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  {...register("videoFile", {
                    required: "Video file is required",
                    onChange: (e) => setVideoName(e.target.files[0]?.name),
                  })}
                />
              </label>
              {videoName && (
                <p className="mt-3 text-sm text-gray-300">{videoName}</p>
              )}
              {errors.videoFile && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.videoFile.message}
                </p>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <GetImagePreview
                  name="thumbnail"
                  control={control}
                  label="Thumbnail"
                  className="w-full h-64 object-cover rounded-lg border border-gray-700"
                  cameraIcon
                  cameraSize={40}
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  label="Title"
                  {...register("title", { required: "Title is required" })}
                  error={errors.title}
                />

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
