import React, { useState } from "react";
import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";

const BasicInfoForm = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="px-2 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00ed64] to-[#00c050]">
        Create Account
      </h1>
      <p className="text-slate-400 text-sm text-center mt-2 mb-6">
        Join us today!
      </p>

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
            className="w-full bg-[#0d3446] border-[#1e3a47] text-white placeholder-gray-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-[#00ed64] focus:border-transparent"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-400">
              {errors.username.message}
            </p>
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
            className="w-full bg-[#0d3446] border-[#1e3a47] text-white placeholder-gray-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-[#00ed64] focus:border-transparent"
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
            className="w-full bg-[#0d3446] border-[#1e3a47] text-white placeholder-gray-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-[#00ed64] focus:border-transparent"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full bg-[#0d3446] border-[#1e3a47] text-white placeholder-gray-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-[#00ed64] focus:border-transparent"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
