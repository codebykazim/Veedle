import React, { useEffect, useState } from "react";
import {
  Container,
  DeleteConfirmation,
  HeaderSection,
  Spinner,
  StatsSection,
  VideoTable,
  EditVideo,
  UploadVideo,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getChannelStats, getChannelVideos } from "../store/dashboardSlice";
import { deleteAVideo } from "../store/videoSlice";

function AdminDashboard() {
  const username = useSelector((state) => state.auth.userData?.username);
  const dashboard = useSelector((state) => state.dashboard.channelStats);
  const videos = useSelector((state) => state.dashboard.channelVideos);

  const uploaded = useSelector((state) => state.video.uploaded);
  const publishToggled = useSelector((state) => state.video.publishToggled);
  const deleting = useSelector((state) => state.video.loading);

  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [popUp, setPopUp] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });

  const handleDeleteVideo = async () => {
    await dispatch(deleteAVideo(videoDetails?._id));
    setPopUp((prev) => ({ ...prev, deleteVideo: false }));
  };

  useEffect(() => {
    dispatch(getChannelStats());
    dispatch(getChannelVideos());
  }, [dispatch, uploaded, publishToggled, deleting]);

  return (
    <div className="min-h-screen bg-[#051622] text-white pt-14">
      <Container>
        <div className="space-y-8 p-4">
          {popUp.uploadVideo && (
            <UploadVideo
              setUploadVideoPopup={() =>
                setPopUp((prev) => ({ ...prev, uploadVideo: false }))
              }
            />
          )}

          {popUp.editVideo && (
            <EditVideo
              setEditVideoPopup={() =>
                setPopUp((prev) => ({ ...prev, editVideo: false }))
              }
              title={videoDetails?.title}
              description={videoDetails?.description}
              videoId={videoDetails?._id}
              thumbnail={videoDetails?.thumbnail?.url}
            />
          )}

          {popUp.deleteVideo && (
            <DeleteConfirmation
              video={true}
              onCancel={() =>
                setPopUp((prev) => ({ ...prev, deleteVideo: false }))
              }
              onDelete={handleDeleteVideo}
            />
          )}

          {deleting && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-[#072331] border border-[#1e3a47] rounded-lg px-4 py-3 flex items-center gap-3">
                <Spinner />
                <span className="font-medium">Deleting video...</span>
              </div>
            </div>
          )}

          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#00ed64]"></h1>
            <HeaderSection username={username} setPopUp={setPopUp} />
          </div>

          {/* Stats Section */}
          <StatsSection dashboard={dashboard} />

          {/* Video Table */}
          <div className="bg-[#072331] border border-[#1e3a47] rounded-lg overflow-hidden">
            <VideoTable
              videos={videos}
              setPopUp={setPopUp}
              setVideoDetails={setVideoDetails}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AdminDashboard;
