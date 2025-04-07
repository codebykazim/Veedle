import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, userLogin } from "../store/authSlice";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SignupPopup = () => {
    const {
        handleSubmit,
        register,
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 backdrop-blur-sm z-50"
        >
            <motion.div
                initial={{ y: -20, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-slate-700 rounded-2xl p-8 text-white shadow-2xl max-w-md w-full relative overflow-hidden"
            >
                {/* Decorative blurs */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl opacity-20" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-20" />

                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-8 h-8 text-white"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        Create Account
                    </h1>
                    <p className="text-slate-400 text-center mb-6">Join us today!</p>

                    <form onSubmit={handleSubmit(submit)} className="space-y-4">
                        <Input
                            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-3 px-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="text"
                            placeholder="Username"
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
                        )}

                        <Input
                            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-3 px-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                        )}

                        <Input
                            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-3 px-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="text"
                            placeholder="Full Name"
                            {...register("fullName", { required: "Full Name is required" })}
                        />
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
                        )}

                        <Input
                            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-3 px-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </Button>

                        <p className="text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SignupPopup;
