import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, userLogin } from "../store/authSlice";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import LoginSkeleton from "../skeleton/loginSkeleton.jsx";
// import GetImagePreview from "./GetImagePreview.jsx";

function Signup() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const response = await dispatch(createAccount(data));
    if (response?.payload?.success) {
      const { username, password } = data;
      const loginResult = await dispatch(userLogin({ username, password }));

      if (loginResult?.type === "login/fulfilled") {
        navigate("/terms&conditions");
      } else {
        navigate("/login");
      }
    }
  };

//   if (loading) return <LoginSkeleton />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-md bg-white">
        <CardContent>
          <div className="flex justify-center">
            {/* Your Logo Component */}
          </div>

          <Separator className="my-4" />

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {/* Cover Image */}
            {/* <div className="relative w-full h-28 bg-gray-200">
              <GetImagePreview
                name="coverImage"
                control={control}
                className="w-full h-28 object-cover border-none"
                cameraIcon
              />
              <span className="absolute right-2 bottom-2 text-xs text-gray-600">
                Cover Image
              </span> */}

              {/* Avatar */}
              {/* <div className="absolute left-2 bottom-2 rounded-full border-2">
                <GetImagePreview
                  name="avatar"
                  control={control}
                  className="object-cover rounded-full h-20 w-20"
                  cameraIcon
                />
              </div> */}
            {/* </div> */}

            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username.message}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Full Name */}
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter full name"
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName.message}</span>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full text-lg">
              Sign Up
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:opacity-70">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
