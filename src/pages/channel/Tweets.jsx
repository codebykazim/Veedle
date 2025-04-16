import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../../store/tweetSlice";
import TweetAndComment from "@/components/TweetAndComment";
import TweetsList from "@/components/TweetsList";
import { TweetAndCommentSkeleton , TweetsListSkeleton } from '../../skeleton/TweetAndCommentSkeleton';

function ChannelTweets() {
    const dispatch = useDispatch();
    const authId = useSelector((state) => state.auth?.userData?._id);
    const userId = useSelector((state) => state.user?.profileData?._id);
    const tweets = useSelector((state) => state.tweet?.tweets);
    const loading = useSelector((state) => state.tweet?.loading);  // Add loading state here

    useEffect(() => {
        if (userId) dispatch(getUserTweets(userId));
    }, [dispatch, userId]);

    // Render skeletons while loading
    if (loading) {
        return (
            <div>
                {authId === userId && <TweetAndCommentSkeleton />}
                <div>
                    {[...Array(5)].map((_, index) => (
                        <TweetsListSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    // Render actual tweets when loading is complete
    return (
        <div>
            {authId === userId && <TweetAndComment tweet={true} />}
            {tweets?.map((tweet) => (
                <TweetsList
                    key={tweet?._id}
                    avatar={tweet?.ownerDetails?.avatar}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweetId={tweet?._id}
                    username={tweet?.ownerDetails?.username}
                    isLiked={tweet?.isLiked}
                />
            ))}
        </div>
    );
}

export default ChannelTweets;
