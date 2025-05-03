import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTweet } from "../store/tweetSlice";
import { createAComment } from "../store/commentSlice";

function TweetAndComment({ tweet, comment, videoId }) {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const sendContent = (data) => {
    if (data) {
      if (tweet) {
        dispatch(createTweet(data));
      } else if (comment) {
        dispatch(createAComment({ content: data.content, videoId }));
        console.log(data);
        
      }
      setValue("content", "");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-4">
      <form onSubmit={handleSubmit(sendContent)} className="relative">
        <textarea
          placeholder={`${tweet ? "What's happening?" : "Add a comment..."}`}
          className="p-4 text-sm pr-20 focus:border-[#00ed64] text-white border border-[#1e3a47] bg-[#0d3446] outline-none w-full rounded-lg resize-none transition-all min-h-[100px] placeholder-gray-400"
          {...register("content", { required: true })}
          rows={3}
        />
        <Button
          type="submit"
          className="bg-[#00ed64] hover:bg-[#00c050] px-6 py-2 text-[#051622] absolute bottom-3 right-3 text-sm font-medium rounded-full transition-all shadow-md hover:shadow-[#00ed64]/30"
        >
          {tweet ? "Tweet" : "Comment"}
        </Button>
      </form>
    </div>
  );
}

export default TweetAndComment;