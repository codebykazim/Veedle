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
        className="p-3 text-sm pr-16 focus:border-[#00ed64] text-white border border-[#1e3a47] bg-[#0d3446] outline-none w-full rounded-md resize-none transition-colors"
        {...register("content", { required: true })}
        rows={2}
      />
      <Button
        type="submit"
        className="bg-[#00ed64] hover:bg-[#00c050] px-4 py-1 text-[#051622] absolute sm:bottom-8 sm:right-8 bottom-6 right-5 text-xs sm:text-sm rounded-md transition-all"
      >
        Send
      </Button>
    </form>
  )
}

export default TweetAndComment
