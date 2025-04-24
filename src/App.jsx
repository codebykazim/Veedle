import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/authSlice";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/index"));
const SignUp = lazy(() => import("./components/index"));
const Channel = lazy(() => import("./pages/Channel/Channel"));
const ChannelVideos = lazy(() => import("./pages/index"));
const ChannelTweets = lazy(() => import("./pages/index"));
const ChannelSubscribers = lazy(() => import("./pages/index"));
const LikedVideos = lazy(() => import("./pages/LikedVideos"));
const History = lazy(() => import("./pages/History"));
const VideoDetail = lazy(() => import("./pages/VideoDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const EditChannel = lazy(() => import("./pages/EditChannel"));
const ChannelPlaylist = lazy(() => import("./pages/index"));
const PlaylistVideos = lazy(() => import("./pages/PlaylistVideos"));
const SearchVideos = lazy(() => import("./pages/SearchVideos"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const AuthLayout = lazy(() => import("./components/index"));
const Layout = lazy(() => import("./components/index"));
const EditPersonalInfo = lazy(() => import("./components/index"));
const ChangePassword = lazy(() => import("./components/index"));

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path=""
              element={
                <AuthLayout authentication={false}>
                  <Home />
                </AuthLayout>
              }
            />
            <Route
              path="/search/:query"
              element={
                <AuthLayout authentication={false}>
                  <SearchVideos />
                </AuthLayout>
              }
            />
            <Route
              path="/channel/:username"
              element={
                <AuthLayout authentication={true}>
                  <Channel />
                </AuthLayout>
              }
            >
              <Route path="videos" element={<ChannelVideos />} />
              <Route path="playlists" element={<ChannelPlaylist />} />
              <Route path="playlist/:id" element={<PlaylistVideos />} />
              <Route path="tweets" element={<ChannelTweets />} />
              <Route path="subscribed" element={<ChannelSubscribers />} />
            </Route>
            <Route path="/history" element={<History />} />
            <Route path="/liked-videos" element={<LikedVideos />} />
            <Route path="/subscriptions" element={<AdminDashboard />} />
            <Route path="/edit" element={<EditChannel />}>
              <Route path="personalInfo" element={<EditPersonalInfo />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/watch/:videoId" element={<VideoDetail />} />
          <Route path="/collections" element={<AdminDashboard />} />
          <Route path="/terms&conditions" element={<TermsAndConditions />} />
        </Routes>
      </Suspense>

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
