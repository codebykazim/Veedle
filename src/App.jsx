"use client"

import { useEffect, lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthLayout, Login, SignUp } from "./components/index"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "./store/authSlice"
import Spinner from "./components/Spinner"
import { EditPersonalInfo, ChangePassword, Layout } from "./components"

// Lazy loading
const History = lazy(() => import("./pages/History"))
const Channel = lazy(() => import("./pages/Channel/Channel"))
const ChannelVideos = lazy(() => import("./pages/Channel/Videos"))
const ChannelTweets = lazy(() => import("./pages/Channel/Tweets"))
const LikedVideos = lazy(() => import("./pages/LikedVideos"))
const VideoDetail = lazy(() => import("./pages/VideoDetail"))
const ChannelSubscribers = lazy(() => import("./pages/Channel/Subscribers"))
const Subscriptions = lazy(() => import("./pages/Subscriptions"))
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"))
const EditChannel = lazy(() => import("./pages/EditChannel"))
const Home = lazy(() => import("./pages/Home"))
const SearchVideos = lazy(() => import("./pages/SearchVideos"))
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"))
const ChannelPlaylist = lazy(() => import("./pages/Channel/Playlist"))
const PlaylistVideos = lazy(() => import("./pages/PlaylistVideos"))

function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

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
            <Route path="/channel" element={<AuthLayout authentication={true}>{/* Empty for now */}</AuthLayout>} />
            <Route
              path="/channel/:username"
              element={
                <AuthLayout authentication={true}>
                  <Channel />
                </AuthLayout>
              }
            >
              <Route
                path="videos"
                element={
                  <AuthLayout authentication={true}>
                    <ChannelVideos />
                  </AuthLayout>
                }
              />
              <Route
                path="playlists"
                element={
                  <AuthLayout authentication={true}>
                    <ChannelPlaylist />
                  </AuthLayout>
                }
              />
              <Route
                path="tweets"
                element={
                  <AuthLayout authentication={true}>
                    <ChannelTweets />
                  </AuthLayout>
                }
              />
              <Route
                path="subscribed"
                element={
                  <AuthLayout authentication={false}>
                    <ChannelSubscribers />
                  </AuthLayout>
                }
              />
            </Route>
            <Route
              path="/history"
              element={
                <AuthLayout authentication={true}>
                  <History />
                </AuthLayout>
              }
            />
            <Route
              path="/liked-videos"
              element={
                <AuthLayout authentication={true}>
                  <LikedVideos />
                </AuthLayout>
              }
            />
            <Route
              path="/subscriptions"
              element={
                <AuthLayout authentication={true}>
                  <Subscriptions />
                </AuthLayout>
              }
            />
            <Route
              path="/edit"
              element={
                <AuthLayout authentication={true}>
                  <EditChannel />
                </AuthLayout>
              }
            >
              <Route
                path="personalInfo"
                element={
                  <AuthLayout authentication={true}>
                    <EditPersonalInfo />
                  </AuthLayout>
                }
              />
              <Route
                path="password"
                element={
                  <AuthLayout authentication={true}>
                    <ChangePassword />
                  </AuthLayout>
                }
              />
            </Route>
          </Route>

          {/* Standalone routes outside of Layout */}
          <Route
            path="/playlist/:id"
            element={
              <AuthLayout authentication={true}>
                <PlaylistVideos />
              </AuthLayout>
            }
          />

          <Route
            path="/login"
            element={
              <AuthLayout authentication={false}>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout authentication={false}>
                <SignUp />
              </AuthLayout>
            }
          />
          <Route
            path="/watch/:videoId"
            element={
              <AuthLayout authentication={true}>
                <VideoDetail />
              </AuthLayout>
            }
          />
          <Route
            path="/collections"
            element={
              <AuthLayout authentication={true}>
                <AdminDashboard />
              </AuthLayout>
            }
          />
          <Route
            path="/terms&conditions"
            element={
              <AuthLayout authentication={true}>
                <TermsAndConditions />
              </AuthLayout>
            }
          />
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
  )
}

export default App
