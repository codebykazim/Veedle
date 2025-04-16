"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  createAPlaylist,
  getPlaylistsByUser,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  updatePlaylist,
  deletePlaylist,
} from "../../store/playlistSlice"
import { getAllVideos } from "../../store/videoSlice"
import { Input } from "../../components/index"
import { useForm } from "react-hook-form"
import { timeAgo } from "../../helpers/timeAgo"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Trash, Pencil, Plus, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlaylistSkeleton } from "../../skeleton/PlaylistSkeleton"

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

  useEffect(() => {
    if (userId) {
      dispatch(getPlaylistsByUser(userId))
      dispatch(getAllVideos({ userId }))
    }
  }, [dispatch, userId])

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

  const handleAddVideo = (videoId) => {
    if (selectedPlaylistId && videoId) {
      dispatch(addVideoToPlaylist({ videoId, playlistId: selectedPlaylistId }))
    }
  }

  const handleRemoveVideo = (videoId) => {
    if (selectedPlaylistId && videoId) {
      dispatch(removeVideoFromPlaylist({ playlistId: selectedPlaylistId, videoId }))
    }
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

  if (loading) {
    return <PlaylistSkeleton />
  }

  return (
    <>
      <div className="w-full relative text-white sm:px-5 px-0">
        {playlists?.length === 0 && !loading && (
          <div className="text-center py-16 flex flex-col justify-center items-center">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 max-w-md">
              <h1 className="text-xl font-medium mb-2">No Playlists Found</h1>
              {authId === userId && (
                <p className="text-gray-400 mb-4">
                  Create your first playlist to organize your favorite videos.
                </p>
              )}
            </div>
          </div>
        )}

        {authId === userId && (
          <div className="w-full flex justify-center mt-5">
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2"
              onClick={() => {
                setIsEditMode(false)
                reset()
                setOpenCreatePlaylist(true)
              }}
            >
              <Plus size={16} />
              Create Playlist
            </Button>
          </div>
        )}

        <div className="grid xl:grid-cols-3 md:grid-cols-2 p-4 gap-5 grid-cols-1 w-full mt-5">
          {playlists?.map((playlist) => (
            <div
              key={playlist._id}
              className="relative h-[15rem] w-full border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all hover:shadow-md hover:shadow-purple-900/20 group"
            >
              <Link to={`/playlist/${playlist._id}`} className="absolute inset-0 z-10" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>

              <div className="absolute flex justify-between bottom-0 left-0 border-t border-slate-700 py-2 px-3 w-full backdrop-blur-sm bg-black/30 z-20">
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-medium">Playlist</h1>
                  <div className="text-xs text-slate-300">
                    {playlist.totalViews} Views • {timeAgo(playlist.updatedAt)}
                  </div>
                </div>
                <p className="bg-black/50 px-2 py-1 rounded-full text-xs self-start">
                  {playlist.totalVideos} Videos
                </p>
              </div>

              <div className="py-2 px-3 z-20 relative">
                <p className="text-sm font-bold group-hover:text-purple-400 transition-colors">{playlist.name}</p>
                <p className="text-xs w-full h-4 overflow-hidden text-gray-300">{playlist.description}</p>
              </div>

              {authId === userId && (
                <div className="absolute top-2 right-2 flex gap-2 z-30">
                  <Button
                    className="text-xs bg-purple-700 hover:bg-purple-800"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedPlaylistId(playlist._id)
                      setOpenVideoModal(true)
                    }}
                  >
                    Manage Videos
                  </Button>

                  <Button
                    className="p-1 bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openEditModal(playlist)
                    }}
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    className="p-1 bg-red-600 hover:bg-red-700"
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
        <DialogContent className="bg-black border border-slate-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isEditMode ? "Edit Playlist" : "Create Playlist"}
            </DialogTitle>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(isEditMode ? handleUpdatePlaylist : createPlaylist)}
            className="w-full space-y-5 p-4"
          >
            <div className="space-y-2">
              <Input
                label="Name: "
                placeholder="Enter playlist name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div className="space-y-2">
              <Input
                label="Description: "
                placeholder="Enter description for your playlist"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded-md transition-colors">
              {isEditMode ? "Update Playlist" : "Create Playlist"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Management Modal */}
      {openVideoModal && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex justify-center items-center p-4 overflow-y-auto">
    <div className="w-full max-w-2xl bg-zinc-900 p-6 rounded-md border border-slate-600 relative">
      <button className="absolute top-2 right-4 cursor-pointer" onClick={() => setOpenVideoModal(false)}>
        <X size={24} />
      </button>
      <h2 className="text-xl mb-4">Manage Playlist Videos</h2>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {videos?.length > 0 ? (
          videos.map((video) => {
            const playlist = playlists?.find((p) => p._id === selectedPlaylistId)
            const isInPlaylist = playlist?.videos?.includes(video._id)

            return (
              <div key={video._id} className="flex justify-between items-center border-b border-slate-700 pb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={video.thumbnail?.url || "/placeholder.svg"}
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold line-clamp-1">{video.title}</p>
                    <p className="text-xs text-slate-400">
                      {video.views} views • {timeAgo(video.createdAt)}
                    </p>
                  </div>
                </div>
                <Button
                  className={`text-sm ${
                    isInPlaylist ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  }`}
                  onClick={() => (isInPlaylist ? handleRemoveVideo(video._id) : handleAddVideo(video._id))}
                >
                  {isInPlaylist ? "Remove" : "Add"}
                </Button>
              </div>
            )
          })
        ) : (
          <p className="text-center text-gray-400">No videos available.</p>
        )}
      </div>
    </div>
  </div>
)}


      {/* Delete Confirmation Modal */}
      {openDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-zinc-900 p-6 rounded-md border border-slate-600 relative">
            <button className="absolute top-2 right-4 cursor-pointer" onClick={() => setOpenDeleteConfirm(false)}>
              <X size={24} />
            </button>
            <h2 className="text-xl mb-4">Delete Playlist</h2>
            <p className="mb-6">Are you sure you want to delete this playlist? This action cannot be undone.</p>

            <div className="flex justify-end gap-3">
              <Button className="bg-slate-600 hover:bg-slate-700" onClick={() => setOpenDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleDeletePlaylist}>
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
