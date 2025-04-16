import React, { useEffect, useState } from "react";
import ChannelHeader from '../../components/Channel/ChannelHeader';
import ChannelNavigate from "../../components/Channel/ChannelNavigate";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from '../../store/userSlice.js';
import { Outlet, useParams } from "react-router-dom";

function Channel() {
    const dispatch = useDispatch();
    const { username } = useParams();

    const channel = useSelector((state) => state.user?.profileData);

    useEffect(() => {
        dispatch(userChannelProfile(username));
    }, [dispatch, username]);
    console.log(channel);

    window.scrollTo(0, 0);

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white">
            <div className="sm:ml-60 pt-14">
                {channel && (
                    <ChannelHeader
                        username={username}
                        coverImage={channel?.coverImage}
                        avatar={channel?.avatar}
                        subscribedCount={channel?.channelsSubscribedToCount}
                        fullName={channel?.fullName}
                        subscribersCount={channel?.subscribersCount}
                        isSubscribed={channel?.isSubscribed}
                        channelId={channel?._id}
                    />
                )}
                <ChannelNavigate username={username} />
                <div className="overflow-y-auto pb-20 sm:pb-0 px-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Channel;
