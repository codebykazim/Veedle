import { Input } from "../components";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../store/authSlice";

function ChangePassword() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(
        changePassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        })
      ).unwrap();
      reset();
    } catch (error) {
      console.error("Password change failed:", error);
    }
  };

  return (
    <div className="w-full text-white flex justify-center items-start pt-8 px-4">
      <div className="bg-[#072331] p-6 rounded-lg shadow-lg w-full max-w-md border border-[#1e3a47]">
        <h2 className="text-xl font-bold mb-2 text-[#00ed64]">
          Change Password
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Update your account password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <Input
              label="Old Password"
              type="password"
              placeholder="Enter current password"
              {...register("oldPassword", {
                required: "Current password is required",
              })}
            />
            {errors.oldPassword && (
              <span className="text-xs text-red-500">
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.newPassword && (
              <span className="text-xs text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("newPassword") || "Passwords don't match",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00ed64] hover:bg-[#00c050] text-[#051622] font-medium py-2 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
