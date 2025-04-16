"use client"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Input from "./Input"
import { Button } from "./ui/button"
import { IoCloseCircleOutline } from "react-icons/io5"

function SearchForSmallScreen({ open, setOpenSearch }) {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const search = (data) => {
    const query = data?.query
    navigate(`/search/${query}`)
    setOpenSearch((prev) => !prev)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-start justify-center animate-in fade-in duration-200">
      <div className="sm:p-8 p-4 relative w-full max-w-lg">
        <button
          className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors"
          onClick={() => setOpenSearch((prev) => !prev)}
          aria-label="Close search"
        >
          <IoCloseCircleOutline size={30} />
        </button>

        <form onSubmit={handleSubmit(search)} className="flex flex-col sm:flex-row items-center gap-2 mt-16 sm:mt-10">
          <Input
            type="text"
            placeholder="Search videos, channels..."
            className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
            {...register("query", { required: true })}
          />
          <Button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-purple-500 text-white font-semibold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-md transition-colors"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SearchForSmallScreen
