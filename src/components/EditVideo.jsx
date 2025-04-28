import { useEffect } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateAVideo, updateUploadState } from "../store/videoSlice";
import GetImagePreview from "./GetImagePreview";

function EditVideo({
  videoId,
  title,
  description,
  setEditVideoPopup,
  thumbnail,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  const handleClosePopUp = () => {
    setEditVideoPopup((prev) => ({ ...prev, editVideo: false }));
  };

  const updateVideo = async (data) => {
    await dispatch(updateAVideo({ videoId, data }));
    handleClosePopUp();
    dispatch(updateUploadState());
  };

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
    setValue("thumbnail", thumbnail);
  }, [title, description, thumbnail, setValue]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 p-4">
      <form
        onSubmit={handleSubmit(updateVideo)}
        className="bg-[#072331] border border-[#1e3a47] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#072331] border-b border-[#1e3a47] p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold">Edit Video</h2>
            <p className="text-sm text-gray-400">
              Make changes to your video details
            </p>
          </div>
          <X
            size={24}
            onClick={handleClosePopUp}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          <div>
            <GetImagePreview
              name={"thumbnail"}
              control={control}
              label={"Thumbnail"}
              cameraIcon
              cameraSize={30}
              className={
                "w-full h-64 object-cover rounded-lg border border-[#1e3a47]"
              }
              image={thumbnail}
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Input
                type="text"
                label="Title"
                {...register("title", { required: "Title is required" })}
                error={errors.title}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                rows={5}
                className="w-full bg-[#0d3446] border border-[#1e3a47] rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#00ed64] focus:border-transparent"
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

            <div className="flex gap-3 pt-2 justify-end">
              <Button
                type="button"
                onClick={handleClosePopUp}
                variant="outline"
                className=" border-[#1e3a47] bg-[#0d3446] hover:bg-[#164863]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#00ed64] hover:bg-[#00c050] text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditVideo;
