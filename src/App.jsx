import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/authSlice";
import Spinner from "./components/Spinner";

// Lazy loaded pages & components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/Signup"));
const AuthLayout = lazy(() => import("./components/AuthLayout"));
const Layout = lazy(() => import("./components/Layout"));
const EditPersonalInfo = lazy(() => import("./components/EditPersonalInfo"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));
const Channel = lazy(() => import("./pages/Channel/Channel"));
const ChannelVideos = lazy(() => import("./pages/Channel/Videos"));
const ChannelTweets = lazy(() => import("./pages/Channel/Tweets"));
const ChannelSubscribers = lazy(() => import("./pages/Channel/Subscribers"));
const ChannelPlaylist = lazy(() => import("./pages/Channel/Playlist"));
const LikedVideos = lazy(() => import("./pages/LikedVideos"));
const History = lazy(() => import("./pages/History"));
const VideoDetail = lazy(() => import("./pages/VideoDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const EditChannel = lazy(() => import("./pages/EditChannel"));
const PlaylistVideos = lazy(() => import("./pages/PlaylistVideos"));
const SearchVideos = lazy(() => import("./pages/SearchVideos"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Suspense fallback={<Spinner />}><Layout /></Suspense>}>
          {/* Public Routes */}
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <AuthLayout authentication={false}>
                  <Home />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route
            path="/search/:query"
            element={
              <Suspense fallback={<Spinner />}>
                <AuthLayout authentication={false}>
                  <SearchVideos />
                </AuthLayout>
              </Suspense>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/channel/:username"
            element={
              <Suspense fallback={<Spinner />}>
                <AuthLayout authentication={true}>
                  <Channel />
                </AuthLayout>
              </Suspense>
            }
          >
            <Route
              path="videos"
              element={<Suspense fallback={<Spinner />}><ChannelVideos /></Suspense>}
            />
            <Route
              path="playlists"
              element={<Suspense fallback={<Spinner />}><ChannelPlaylist /></Suspense>}
            />
            <Route
              path="playlist/:id"
              element={<Suspense fallback={<Spinner />}><PlaylistVideos /></Suspense>}
            />
            <Route
              path="tweets"
              element={<Suspense fallback={<Spinner />}><ChannelTweets /></Suspense>}
            />
            <Route
              path="subscribed"
              element={<Suspense fallback={<Spinner />}><ChannelSubscribers /></Suspense>}
            />
          </Route>

          <Route
            path="/history"
            element={
              <Suspense fallback={<Spinner />}>
                <AuthLayout authentication={true}>
                  <History />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route
            path="/liked-videos"
            element={
              <Suspense fallback={<Spinner />}>
                <AuthLayout authentication={true}>
                  <LikedVideos />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <Suspense fallback={<Spinner />}>
                <AuthLayout authentication={true}>
                  <AdminDashboard />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route
            path="/edit"
            element={
              <Suspense fallback={<Spinner />}>
                <AuthLayout authentication={true}>
                  <EditChannel />
                </AuthLayout>
              </Suspense>
            }
          >
            <Route
              path="personalInfo"
              element={<Suspense fallback={<Spinner />}><EditPersonalInfo /></Suspense>}
            />
            <Route
              path="password"
              element={<Suspense fallback={<Spinner />}><ChangePassword /></Suspense>}
            />
          </Route>
        </Route>

        {/* Auth and misc routes outside layout */}
        <Route path="/login" element={<Suspense fallback={<Spinner />}><Login /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<Spinner />}><SignUp /></Suspense>} />
        <Route path="/watch/:videoId" element={<Suspense fallback={<Spinner />}><VideoDetail /></Suspense>} />
        <Route path="/collections" element={<Suspense fallback={<Spinner />}><AdminDashboard /></Suspense>} />
        <Route path="/terms&conditions" element={<Suspense fallback={<Spinner />}><TermsAndConditions /></Suspense>} />
      </Routes>

      {/* Toast Notifications */}
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
