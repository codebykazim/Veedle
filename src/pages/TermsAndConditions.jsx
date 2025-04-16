"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
// import { Logo } from "../components"

function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="min-h-screen flex justify-center items-center bg-black p-4">
      <div className="max-w-md w-full bg-black border border-slate-800 text-white rounded-xl p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          {/* <Logo /> */}
          <div className="h-10 w-10 bg-purple-500 rounded-full"></div>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <div className="mb-6 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>This project is to showcase my skills in web development.</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>This web app is still in development.</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>Do not upload videos greater than 100 MB.</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>Upload no explicit content meant to be emotionally gratifying.</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center mb-6">
          <Checkbox
            id="termsCheckbox"
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
            className="mr-2 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
          />
          <label htmlFor="termsCheckbox" className="font-medium cursor-pointer">
            I agree to the terms and conditions
          </label>
        </div>

        {isChecked ? (
          <Link to="/">
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 rounded-md transition-colors">
              Continue
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full bg-gray-700 text-gray-400 font-medium py-2 rounded-md cursor-not-allowed">
            Continue
          </Button>
        )}
      </div>
    </div>
  )
}

export default TermsAndConditions
