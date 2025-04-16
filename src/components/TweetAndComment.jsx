"use client"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { createTweet } from "../store/tweetSlice"
import { createAComment } from "../store/commentSlice"

function TweetAndComment({ tweet, comment, videoId }) {
  const { register, handleSubmit, setValue } = useForm()
  const dispatch = useDispatch()

  const sendContent = (data) => {
    if (data) {
      if (tweet) {
        dispatch(createTweet(data))
      } else if (comment) {
        dispatch(createAComment({ content: data.content, videoId }))
      }
      setValue("content", "")
    }
  }

  return (
    <form onSubmit={handleSubmit(sendContent)} className="sm:p-5 p-3 sm:max-w-4xl w-full relative">
      <textarea
        placeholder={`${tweet ? "Write a tweet..." : "Add a comment..."}`}
        className="p-3 text-sm pr-16 focus:border-purple-500 text-white border border-slate-500 bg-[#222222] outline-none w-full rounded-md resize-none transition-colors"
        {...register("content", { required: true })}
        rows={2}
      />
      <Button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 px-4 py-1 text-white absolute sm:bottom-8 sm:right-8 bottom-6 right-5 text-xs sm:text-sm rounded-md transition-all"
      >
        Send
      </Button>
    </form>
  )
}

export default TweetAndComment
