import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Logo } from "../components";

function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#051622] p-4">
      <div className="max-w-md w-full bg-[#072331] border border-[#1e3a47] text-white rounded-xl p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-[#00ed64]">
          Terms and Conditions
        </h1>

        <div className="mb-6 bg-[#0d3446] p-4 rounded-lg border border-[#1e3a47]">
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-[#00ed64] mr-2">•</span>
              <span>
                This web app is in development, and we're continuously improving
                it to give you the best experience possible.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#00ed64] mr-2">•</span>
              <span>
                Please avoid uploading files larger than 100MB to ensure a
                smooth experience for everyone.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#00ed64] mr-2">•</span>
              <span>
                We strive to keep the content clean and respectful. No explicit
                or inappropriate uploads, please.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#00ed64] mr-2">•</span>
              <span>
                By agreeing, you're helping us create a better platform for all
                users. Thank you!
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center mb-6">
          <Checkbox
            id="termsCheckbox"
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
            className="mr-2 data-[state=checked]:bg-[#00ed64] data-[state=checked]:border-[#00ed64]"
          />
          <label htmlFor="termsCheckbox" className="font-medium cursor-pointer">
            I agree to the terms and conditions
          </label>
        </div>

        {isChecked ? (
          <Link to="/">
            <Button className="w-full bg-[#00ed64] hover:bg-[#00c050] text-[#051622] font-medium py-2 rounded-md transition-colors">
              Continue
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            className="w-full bg-gray-700 text-gray-400 font-medium py-2 rounded-md cursor-not-allowed"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

export default TermsAndConditions;
