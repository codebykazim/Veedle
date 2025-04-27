import { useEffect } from "react";
import { Input } from "../components";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../store/authSlice";

function EditPersonalInfo() {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isSubmitting },
    setValue,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    if (auth) {
      reset({
        fullName: auth.fullName,
        email: auth.email,
      });
    }
  }, [auth, reset]);

  const saveChanges = async (data) => {
    console.log("Submitting data:", data);
    try {
      const result = await dispatch(updateUserDetails(data)).unwrap();
      console.log("Update response:", result);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="w-full text-white flex justify-center items-start pt-8 px-4">
      <div className="bg-[#072331] p-6 rounded-lg shadow-lg w-full max-w-md border border-[#1e3a47]">
        <h2 className="text-xl font-bold mb-2">Personal Information</h2>
        <p className="text-sm text-gray-400 mb-6">
          Update your personal details
        </p>

        <form onSubmit={handleSubmit(saveChanges)} className="space-y-5">
          <div className="space-y-1">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            {errors.fullName && (
              <span className="text-xs text-red-500">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 border border-[#1e3a47] text-white font-medium rounded-md hover:bg-[#0d3446] transition-colors"
              disabled={!isDirty || isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-[#00ed64] hover:bg-[#00c050] text-[#051622] font-medium rounded-md"
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPersonalInfo;
