import React from "react";
import { useNavigate } from "react-router-dom";

function Avatar({ src, channelName, size = "md" }) {
    const navigate = useNavigate();

    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12"
    };

    const handleAvatarClick = (e) => {
        e.stopPropagation();
        navigate(`/channel/${channelName}`);
    };

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-purple-500/20 flex items-center justify-center overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer`}>
            {src ? (
                <img
                    src={src}
                    alt="avatar"
                    className="w-full h-full object-cover"
                    onClick={handleAvatarClick}
                />
            ) : (
                <span className="text-lg font-bold text-purple-400">
                    {channelName?.charAt(0)?.toUpperCase()}
                </span>
            )}
        </div>
    );
}

export default Avatar;