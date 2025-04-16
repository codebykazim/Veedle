import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers } from "../../store/subscriptionSlice";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChannelSubscribersSkeleton from "@/skeleton/ChannelSubscribersSkeleton";

function ChannelSubscribers() {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.user.profileData?._id);
  const subscribers = useSelector((state) => state.subscription.channelSubscribers);
  const loading = useSelector((state) => state.subscription.loading);

  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelSubscribers(channelId));
    }
  }, [dispatch, channelId]);

  if (loading) {
    return <ChannelSubscribersSkeleton />;
  }

  if (!loading && (!subscribers || subscribers.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-white">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
          <h3 className="text-xl font-medium mb-2">No subscribers yet</h3>
          <p className="text-gray-400">
            When people subscribe to your channel, they'll appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-700">
      {subscribers.map((subscriber) => (
        <Link
          to={`/channel/${subscriber?.subscriber?.username}`}
          key={subscriber?.subscriber?._id}
          className="flex px-4 py-3 justify-between items-center text-white hover:bg-slate-800/30 transition-colors"
        >
          <div className="flex gap-3 items-center">
            <Avatar
              src={subscriber?.subscriber?.avatar}
              channelName={subscriber?.subscriber?.username}
            />
            <div>
              <h5 className="text-sm font-medium">{subscriber?.subscriber?.username}</h5>
              <span className="text-xs text-slate-400">
                {subscriber?.subscriber?.subscribersCount} Subscribers
              </span>
            </div>
          </div>
          <Button
            className={`${
              subscriber?.subscriber?.subscribedToSubscriber
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-purple-500 hover:bg-purple-600"
            } text-white text-xs py-1 px-3 rounded-full transition-colors`}
          >
            {subscriber?.subscriber?.subscribedToSubscriber ? "Subscribed" : "Subscribe"}
          </Button>
        </Link>
      ))}
    </div>
  );
}

export default ChannelSubscribers;
