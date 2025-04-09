import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/videoSlice";
import { VideoList, Container } from "../components";
// import HomeSkeleton from "../skeleton/HomeSkeleton";
import InfiniteScroll from '../components/InfiniteScroll';

function Home() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video?.videos?.docs);
    const loading = useSelector((state) => state.video?.loading);
    const hasNextPage = useSelector(
        (state) => state.video?.videos?.hasNextPage
    );
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getAllVideos({ page: 1, limit: 10 }));

        return () => dispatch(makeVideosNull());
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const fetchMoreVideos = useCallback(() => {
        if (hasNextPage) {
            dispatch(getAllVideos({ page: page + 1, limit: 10 }))
                .then(() => {
                    setPage((prev) => prev + 1);
                })
                .catch((error) => {
                    console.error("Error loading more videos:", error);
                    setIsLoading(false);
                });
        }
    }, [page, hasNextPage, dispatch]);

    return (
        <Container>
            <InfiniteScroll
                dataLength={videos?.length || 0}
                next={fetchMoreVideos}
                hasMore={hasNextPage}
                // loader={isLoading && <HomeSkeleton />}
                scrollableTarget="scrollable-container"
            >
                <div
                    className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll"
                    id="scrollable-container"
                >
                    {videos?.map((video) => (
                        <VideoList
                            key={video._id}
                            avatar={video.ownerDetails?.avatar.url}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail?.url}
                            createdAt={video.createdAt}
                            views={video.views}
                            channelName={video.ownerDetails.username}
                            videoId={video._id}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </Container>
    );
}

export default Home;
















// // import {Card } from "../components/ui/card"
// import Card from "@/components/Card/Card"

// const videos = [
//   {
//     title: "Creating a YouTube Clone with React & Tailwind CSS - Full Tutorial for Beginners",
//     image: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//     channel: "Channel One",
//     views: "3.8M",
//     time: "2 months",
//   },
//   {
//     title: "Learn Web Development in 2024 - Complete Roadmap from Beginner to Advanced",
//     image: "https://i.ytimg.com/vi/vutosf04gUQ/maxresdefault.jpg",
//     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//     channel: "Channel Two",
//     views: "1.2M",
//     time: "1 week",
//   },
//   {
//     title: "10 Modern JavaScript Features You Should Be Using",
//     image:
//       "https://images.creativemarket.com/0.1.0/ps/8153948/1820/1214/m1/fpnw/wm0/prev-cm-1-.jpg?1587131055&s=678d97b9e41e456f26c32a3315d711b6",
//     avatar: "https://randomuser.me/api/portraits/men/3.jpg",
//     channel: "Channel Three",
//     views: "890K",
//     time: "5 days",
//   },
//   {
//     title: "Building a Responsive Dashboard with Tailwind CSS",
//     image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/55ceb7157060263.63726d4260a81.jpg",
//     avatar: "https://randomuser.me/api/portraits/women/4.jpg",
//     channel: "Channel Four",
//     views: "500K",
//     time: "3 months",
//   },
//   {
//     title: "Advanced React Patterns and Best Practices",
//     image: "https://cdn.dribbble.com/users/6046827/screenshots/17519445/media/0b75715136317979b3ce7ebec343c754.jpg",
//     avatar: "https://randomuser.me/api/portraits/men/5.jpg",
//     channel: "Channel Five",
//     views: "2.1M",
//     time: "6 months",
//   },
// ]

// function Home() {
//   return (
//     <div className="bg-[#121212] min-h-screen ml-60 mt-14">
//       {/* Video Grid */}
//       <div className="grid grid-cols-2 gap-x-4 gap-y-8 p-6">
//         {videos.map((video, index) => (
//           <Card
//             key={index}
//             title={video.title}
//             image={video.image}
//             avatar={video.avatar}
//             channel={video.channel}
//             views={video.views}
//             time={video.time}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Home
