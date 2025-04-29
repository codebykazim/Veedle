import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, userLogin } from "../store/authSlice";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Import our separated components
import BasicInfoForm from "./BasicInfoForm";
import FilesInfoForm from "./FilesInfoForm";

function SignUp() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(1); // 1 for basic info, 2 for images
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const loading = useSelector((state) => state.auth?.loading);

  const submitBasicInfo = (data) => {
    setFormData(data);
    setStep(2);
  };

  const submitFinal = async (imageData) => {
    const completeData = { ...formData, ...imageData };
    const response = await dispatch(createAccount(completeData));

    if (response?.payload?.success) {
      const username = formData?.username;
      const password = formData?.password;
      const loginResult = await dispatch(userLogin({ username, password }));

      if (loginResult?.type === "login/fulfilled") {
        navigate("/terms&conditions");
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 backdrop-blur-sm z-50 overflow-y-auto py-8"
    >
      <motion.div
        initial={{ y: -20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-gradient-to-br from-[#051622] via-[#072331] to-[#051622] border border-[#1e3a47] rounded-2xl p-6 sm:p-8 text-white shadow-2xl w-full max-w-md mx-4 my-auto relative"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00ed64] rounded-full filter blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#0d3446] rounded-full filter blur-3xl opacity-20" />

        <div className="relative z-10">
          {step === 1 ? (
            <>
              <BasicInfoForm register={register} errors={errors} />
              <Button
                onClick={handleSubmit(submitBasicInfo)}
                className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-[#00ed64] to-[#00c050] hover:from-[#00c050] hover:to-[#00a040] transition-all duration-300 shadow-lg hover:shadow-[#00ed64]/20 text-[#051622] mt-6"
              >
                Continue
              </Button>
              <p className="text-center text-sm text-slate-400 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#00ed64] hover:text-[#00c050] font-medium transition-colors"
                >
                  Login
                </Link>
              </p>
            </>
          ) : (
            <>
              <FilesInfoForm control={control} />
              <div className="flex justify-between gap-4 mt-2">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-7 py-3 rounded-xl font-semibold text-lg bg-transparent border border-[#1e3a47] hover:bg-[#0d3446] text-white"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit(submitFinal)}
                  className="px-7 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-[#00ed64] to-[#00c050] hover:from-[#00c050] hover:to-[#00a040] transition-all duration-300 shadow-lg hover:shadow-[#00ed64]/20 text-[#051622]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      Signing up...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SignUp;
