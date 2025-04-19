import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, userLogin } from "../store/authSlice";
import { Link } from "react-router-dom";
import Input from "./Input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion";
import GetImagePreview from "./GetImagePreview";

function SignUp() {

// const modalRef = useRef(null);

// useEffect(() => {
//     const handleClickOutside = (event) => {
//         if (modalRef.current && !modalRef.current.contains(event.target)) {
//             navigate("/");
//         }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//     };
// }, []);


    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword]= useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth?.loading);

    const submit = async (data) => {
        const response = await dispatch(createAccount(data));
        if (response?.payload?.success) {
            const username = data?.username;
            const password = data?.password;
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
                // ref={modalRef}
                initial={{ y: -20, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-slate-700 rounded-2xl p-6 sm:p-8 text-white shadow-2xl w-full max-w-md mx-4 my-auto relative"
            >
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl opacity-20" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-20" />

                <div className="relative z-10">
                    {/* Cover image with avatar */}
                    <div className="relative w-full h-32 sm:h-36 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg mb-12 overflow-hidden">
                        {/* Cover image implementation */}
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

                        {/* Avatar implementation - Using pattern from reference code */}
                        <div className="absolute -bottom-0 left-4">
                            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center">
                                <GetImagePreview
                                    name="avatar"
                                    control={control}
                                    className="w-full h-full object-cover rounded-full"
                                    cameraIcon={true}
                                    cameraSize={20}
                                    cameraClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-2 sm:px-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Create Account
                        </h1>
                        <p className="text-slate-400 text-sm text-center mt-2 mb-6">Join us today!</p>

                        <form onSubmit={handleSubmit(submit)} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Username
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter username"
                                        {...register("username", {
                                            required: "Username is required",
                                        })}
                                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                    {errors.username && (
                                        <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="Enter email"
                                        {...register("email", {
                                            required: "Email is required",
                                        })}
                                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter full name"
                                        {...register("fullName", {
                                            required: "Full name is required",
                                        })}
                                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Password
                                    </label>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                    <button
                                                    type="button"
                                                    className="absolute right-7 bottom-32 -translate-y-1/2 text-gray-400 hover:text-white"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                  >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                  </button>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 mt-6"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>

                            <p className="text-center text-sm text-slate-400 mt-4">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SignUp;