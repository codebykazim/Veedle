import React from "react";
import { ImBin, GrEdit } from "../../components/icons";
import TogglePublish from "../TogglePublish";

function VideoTable({ videos, setPopUp, setVideoDetails }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-[#1a1a1a]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Publish
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Date Uploaded
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {videos?.map((video) => (
            <tr
              key={video?._id}
              className="hover:bg-[#1a1a1a] transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <TogglePublish
                  isPublished={video?.isPublished}
                  videoId={video?._id}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    video?.isPublished
                      ? "bg-green-900 text-green-300"
                      : "bg-orange-900 text-orange-300"
                  }`}
                >
                  {video?.isPublished ? "Published" : "Unpublished"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                {video?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs">
                  {video?.likesCount} likes
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {video?.createdAt
                  ? new Date(
                      video.createdAt.year,
                      video.createdAt.month - 1,
                      video.createdAt.day
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setVideoDetails(video);
                      setPopUp((prev) => ({ ...prev, editVideo: true }));
                    }}
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    <GrEdit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setVideoDetails(video);
                      setPopUp((prev) => ({ ...prev, deleteVideo: true }));
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <ImBin size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VideoTable;
