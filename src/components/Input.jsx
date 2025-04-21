"use client"

import React from "react"

import { useId } from "react"

const Input = React.forwardRef(function Input({ label, type = "text", placeholder, className = "", ...props }, ref) {
  const id = useId()
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-white" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 bg-[#0d3446] text-white outline-none focus:bg-[#164863] duration-200 border border-[#1e3a47] w-full rounded-md focus:ring-1 focus:ring-[#00ed64] ${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  )
})

export default Input
