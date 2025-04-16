// import React from "react";
// import {  Input } from "./index";
// import { Button } from "./ui/button";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser, userLogin } from "../store/authSlice.js";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // import LoginSkeleton from "../skeleton/loginSkeleton.jsx";

// function Login() {
//     const {
//         handleSubmit,
//         register,
//         formState: { errors },
//     } = useForm();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const loading = useSelector((state) => state.auth?.loading);

//     const submit = async (data) => {
//         const isEmail = data.username.includes("@");
//         const loginData = isEmail
//             ? { email: data.username, password: data.password }
//             : data;

//         const response = await dispatch(userLogin(loginData));
//         const user = await dispatch(getCurrentUser());
//         if (user && response?.payload) {
//             navigate("/");
//         }
//     };

//     // if (loading) {
//     //     return <LoginSkeleton />;
//     // }

//     return (
//         <>
//             <div className="w-full h-screen text-white p-3 flex justify-center items-start">
//                 <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
//                     <div className="flex items-center gap-2 mt-5">
//                         {/* <Logo /> */}
//                     </div>

//                     <form
//                         onSubmit={handleSubmit(submit)}
//                         className="space-y-5 p-2"
//                     >
//                         <Input
//                             label="Username / email : "
//                             type="text"
//                             placeholder="example@gmail.com"
//                             {...register("username", {
//                                 required: "username is required",
//                             })}
//                         />
//                         {errors.username && (
//                             <span className="text-red-500">
//                                 {errors.username.message}
//                             </span>
//                         )}
//                         <Input
//                             label="Password: "
//                             type="password"
//                             placeholder="1kd074fjw0"
//                             {...register("password", {
//                                 required: "password is required",
//                             })}
//                         />
//                         {errors.password && (
//                             <span>{errors.password.message}</span>
//                         )}

//                         <Button
//                             type="submit"
//                             bgcolor="bg-purple-500"
//                             className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
//                         >
//                             Login
//                         </Button>

//                         <p className="text-center text-sm">
//                             Don&apos;t have an account?{" "}
//                             <Link
//                                 to={"/signup"}
//                                 className="text-purple-600 cursor-pointer hover:opacity-70"
//                             >
//                                 SignUp
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;

import React, { useEffect, useRef } from "react";
import Input from "../components/Input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userLogin } from "../store/authSlice";
import { motion } from "framer-motion";

function Login() {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : data;

    const response = await dispatch(userLogin(loginData));
    const user = await dispatch(getCurrentUser());
    if (user && response?.payload) {
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 backdrop-blur-sm z-50"
      style={{ pointerEvents: "auto" }}
    >
      <motion.div
        ref={modalRef}
        initial={{ y: -20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-slate-700 rounded-2xl p-8 text-white text-center shadow-2xl max-w-sm w-full relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-8 h-8 text-white"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Welcome Back
          </h1>
          <p className="text-slate-400 mb-6">Sign in to access your account</p>

          <form onSubmit={handleSubmit(submit)} className="space-y-5 text-left">
            <div>
              <Input
                className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-3 px-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                placeholder="Username or email"
                {...register("username", {
                  required: "Username or email is required",
                })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Input
                className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 py-3 px-4 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>

            <p className="text-center text-sm text-slate-400 mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
