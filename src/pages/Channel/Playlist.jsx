"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createAPlaylist, getPlaylistsByUser, updatePlaylist, deletePlaylist } from "../../store/playlistSlice"
import { getAllVideos } from "../../store/videoSlice"
import { Input } from "../../components/index"
import { useForm } from "react-hook-form"
import { timeAgo } from "../../helpers/timeAgo"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Trash, Pencil, Plus, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlaylistSkeleton } from "../../skeleton/PlaylistSkeleton"
import axiosInstance from "../../helpers/axiosInstance"
import toast from "react-hot-toast"

function ChannelPlaylist() {
  const dispatch = useDispatch()
  const playlists = useSelector((state) => state.playlist?.playlists)
  const loading = useSelector((state) => state.playlist?.loading)
  const authId = useSelector((state) => state.auth.userData?._id)
  const userId = useSelector((state) => state.user.profileData?._id)
  const videos = useSelector((state) => state.video?.videos?.docs)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm()

  const [openCreatePlaylist, setOpenCreatePlaylist] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
  const [openVideoModal, setOpenVideoModal] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [localPlaylists, setLocalPlaylists] = useState([])

  useEffect(() => {
    if (userId) {
      dispatch(getPlaylistsByUser(userId))
      dispatch(getAllVideos({ userId }))
    }
  }, [dispatch, userId])

  // Update local playlists when Redux playlists change
  useEffect(() => {
    if (playlists) {
      setLocalPlaylists(playlists)
    }
  }, [playlists])

  const createPlaylist = (data) => {
    dispatch(createAPlaylist(data))
    setOpenCreatePlaylist(false)
    reset()
  }

  const handleUpdatePlaylist = (data) => {
    if (selectedPlaylistId) {
      dispatch(updatePlaylist({ playlistId: selectedPlaylistId, ...data }))
      setOpenCreatePlaylist(false)
      setIsEditMode(false)
      reset()
    }
  }

  const handleDeletePlaylist = () => {
    if (selectedPlaylistId) {
      dispatch(deletePlaylist(selectedPlaylistId))
      setOpenDeleteConfirm(false)
      setSelectedPlaylistId(null)
    }
  }

  const handleAddVideo = async (videoId) => {
    if (selectedPlaylistId && videoId) {
      try {
        // Make direct API call
        const response = await axiosInstance.patch(`/playlist/add/${videoId}/${selectedPlaylistId}`)
        if (response.data?.success) {
          // Fetch the updated playlist directly
          const updatedPlaylist = await fetchCurrentPlaylist(selectedPlaylistId)

          // Also update the local playlists array
          if (updatedPlaylist) {
            updateLocalPlaylist(updatedPlaylist)
          }
        }
      } catch (error) {
        toast.error("Error adding video:", error)
      }
    }
  }

  const handleRemoveVideo = async (videoId) => {
    if (selectedPlaylistId && videoId) {
      try {
        const response = await axiosInstance.patch(`/playlist/remove/${videoId}/${selectedPlaylistId}`)
        if (response.data?.success) {
          const updatedPlaylist = await fetchCurrentPlaylist(selectedPlaylistId)

          if (updatedPlaylist) {
            updateLocalPlaylist(updatedPlaylist)
          }
        }
      } catch (error) {
        toast.error("Error removing video:", error)
      }
    }
  }

  // Update the local playlists array with the updated playlist
  const updateLocalPlaylist = (updatedPlaylist) => {
    setLocalPlaylists((prev) =>
      prev.map((playlist) => (playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist)),
    )
  }

  const openEditModal = (playlist) => {
    setSelectedPlaylistId(playlist._id)
    setValue("name", playlist.name)
    setValue("description", playlist.description)
    setIsEditMode(true)
    setOpenCreatePlaylist(true)
  }

  const closeModal = () => {
    setOpenCreatePlaylist(false)
    setIsEditMode(false)
    reset()
  }

  // Function to fetch the current playlist directly from the API
  const fetchCurrentPlaylist = async (playlistId) => {
    setModalLoading(true)
    try {
      const response = await axiosInstance.get(`/playlist/${playlistId}`)
      if (response.data?.success) {
        const playlist = response.data.data
        setCurrentPlaylist(playlist)
        return playlist
      }
    } catch (error) {
      toast.error("Error fetching playlist:", error)
    } finally {
      setModalLoading(false)
    }
    return null
  }

  const openVideoManagementModal = async (playlistId) => {
    setSelectedPlaylistId(playlistId)
    setOpenVideoModal(true)

    await fetchCurrentPlaylist(playlistId)
  }

  // Function to check if a video is in the current playlist
  const isVideoInPlaylist = (videoId) => {
    if (!currentPlaylist || !currentPlaylist.videos) return false

    return currentPlaylist.videos.some((video) => {
      if (typeof video === "object" && video._id) {
        return video._id === videoId
      }
      return video === videoId
    })
  }

  const handleCloseVideoModal = () => {
    setOpenVideoModal(false)
    setCurrentPlaylist(null)

    if (userId) {
      dispatch(getPlaylistsByUser(userId))
    }
  }

  if (loading) {
    return <PlaylistSkeleton />
  }

  return (
    <>
      <div className="w-full relative text-white sm:px-5 px-0">
        {localPlaylists?.length === 0 && !loading && (
          <div className="text-center py-16 flex flex-col justify-center items-center">
            <div className="bg-[#072331] p-8 rounded-xl border border-[#1e3a47] max-w-md shadow-lg">
              <h1 className="text-2xl font-medium mb-3">No Playlists Found</h1>
              {authId === userId && (
                <p className="text-gray-400 mb-4">Create your first playlist to organize your favorite videos.</p>
              )}
            </div>
          </div>
        )}

        {authId === userId && (
          <div className="w-full flex justify-center mt-6 mb-8">
            <Button
              className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622] px-6 py-2.5 rounded-md transition-colors flex items-center gap-2 font-medium shadow-md shadow-[#00ed64]/10"
              onClick={() => {
                setIsEditMode(false)
                reset()
                setOpenCreatePlaylist(true)
              }}
            >
              <Plus size={18} />
              Create Playlist
            </Button>
          </div>
        )}

        <div className="grid xl:grid-cols-3 md:grid-cols-2 p-4 gap-6 grid-cols-1 w-full mt-5">
          {localPlaylists?.map((playlist) => (
            <div
              key={playlist._id}
              className="relative h-[15rem] w-full border border-[#1e3a47] rounded-xl overflow-hidden hover:border-[#00ed64] transition-all hover:shadow-lg hover:shadow-[#00ed64]/20 group bg-gradient-to-t from-[#051622] to-[#072331]"
            >
              <Link to={`/playlist/${playlist._id}`} className="absolute inset-0 z-10" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#051622]/90 to-transparent"></div>

              <div className="absolute flex justify-between bottom-0 left-0 border-t border-[#1e3a47] py-3 px-4 w-full backdrop-blur-sm bg-[#051622]/40 z-20">
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-medium">Playlist</h1>
                  <div className="text-xs text-slate-300">
                    {playlist.totalViews} Views • {timeAgo(playlist.updatedAt)}
                  </div>
                </div>
                <p className="bg-[#051622]/70 px-3 py-1 rounded-md text-xs self-start border border-[#1e3a47]/50">
                  {playlist.totalVideos} Videos
                </p>
              </div>

              <div className="py-3 px-4 z-20 relative">
                <h2 className="text-lg font-bold group-hover:text-[#00ed64] transition-colors">{playlist.name}</h2>
                <p className="text-xs w-full h-4 overflow-hidden text-gray-300">{playlist.description}</p>
              </div>

              {authId === userId && (
                <div className="absolute top-3 right-3 flex gap-2 z-30">
                  <Button
                    className="text-xs bg-[#0d3446] hover:bg-[#164863] border border-[#1e3a47]/50 shadow-md"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openVideoManagementModal(playlist._id)
                    }}
                  >
                    Manage Videos
                  </Button>

                  <Button
                    className="p-1.5 bg-[#0d3446] hover:bg-[#164863] border border-[#1e3a47]/50 shadow-md"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openEditModal(playlist)
                    }}
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    className="p-1.5 bg-[#0d3446] hover:bg-[#164863] border border-[#1e3a47]/50 shadow-md"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedPlaylistId(playlist._id)
                      setOpenDeleteConfirm(true)
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Playlist Dialog */}
      <Dialog open={openCreatePlaylist} onOpenChange={setOpenCreatePlaylist}>
        <DialogContent className="bg-[#072331] border-2 border-[#1e3a47] text-white sm:max-w-md rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00ed64]">
              {isEditMode ? "Edit Playlist" : "Create Playlist"}
            </DialogTitle>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={closeModal}
            >
              {/* <X size={24} /> */}
            </button>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(isEditMode ? handleUpdatePlaylist : createPlaylist)}
            className="w-full space-y-5 p-5"
          >
            <div className="space-y-2">
              <Input
                label="Name: "
                placeholder="Enter playlist name"
                {...register("name", { required: "Name is required" })}
                className="border-[#1e3a47] bg-[#051622] focus:border-[#00ed64]"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div className="space-y-2">
              <Input
                label="Description: "
                placeholder="Enter description for your playlist"
                {...register("description", {
                  required: "Description is required",
                })}
                className="border-[#1e3a47] bg-[#051622] focus:border-[#00ed64]"
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <Button className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622] w-full py-2.5 rounded-md transition-colors font-medium shadow-md">
              {isEditMode ? "Update Playlist" : "Create Playlist"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Management Modal */}
      {openVideoModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#051622] bg-opacity-90 z-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#072331] p-6 rounded-xl border-2 border-[#1e3a47] relative shadow-2xl">
            <button
              className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
              onClick={handleCloseVideoModal}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl mb-6 text-[#00ed64] font-bold">Manage Playlist Videos</h2>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {modalLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00ed64]"></div>
                </div>
              ) : videos?.length > 0 ? (
                videos.map((video, index) => {
                  const isInPlaylist = isVideoInPlaylist(video._id)
                  const key = `${video._id || "no-id"}-${index}` // Ensure unique fallback key

                  return (
                    <div key={key} className="flex justify-between items-center border-b border-[#1e3a47] pb-4 mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={video.thumbnail?.url || "/placeholder.svg"}
                          alt={video.title}
                          className="w-28 h-20 object-cover rounded-md shadow-md"
                        />
                        <div>
                          <p className="font-semibold line-clamp-1">{video.title}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {video.views} views • {timeAgo(video.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Button
                        className={`text-sm px-4 ${
                          isInPlaylist
                            ? "bg-[#0d3446] hover:bg-[#164863] border border-[#1e3a47]/50"
                            : "bg-[#00ed64] hover:bg-[#00c050] text-[#051622]"
                        } shadow-md`}
                        onClick={() => (isInPlaylist ? handleRemoveVideo(video._id) : handleAddVideo(video._id))}
                      >
                        {isInPlaylist ? "Remove" : "Add"}
                      </Button>
                    </div>
                  )
                })
              ) : (
                <p className="text-center text-gray-400 py-8">No videos available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#051622] bg-opacity-90 z-50 flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-[#072331] p-6 rounded-xl border-2 border-[#1e3a47] relative shadow-2xl">
            <button
              className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
              onClick={() => setOpenDeleteConfirm(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl mb-4 text-[#00ed64] font-bold">Delete Playlist</h2>
            <p className="mb-6 text-gray-300">
              Are you sure you want to delete this playlist? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <Button
                className="bg-[#0d3446] hover:bg-[#164863] border border-[#1e3a47]/50"
                onClick={() => setOpenDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622] font-medium"
                onClick={handleDeletePlaylist}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChannelPlaylist
