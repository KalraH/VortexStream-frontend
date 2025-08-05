import React, { useEffect } from "react";
import HomeSkeleton from "../skeleton/home.skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../store/slices/like.slice";
import { makeVideosNull } from "../store/slices/video.slice";
import { Container, NoVideosFound, VideoList } from "../components/index";

function LikedVideos() {
        const dispatch = useDispatch();
        const likedVideos = useSelector((state) => state.like?.likedVideos);
        const loading = useSelector((state) => state.like.loading);
        window.scrollTo(0, 0);
        useEffect(() => {
                dispatch(getLikedVideos());

                return () => dispatch(makeVideosNull());
        }, [dispatch]);

        if (loading) {
                return <HomeSkeleton />;
        }

        if (likedVideos?.length === 0) {
                return <NoVideosFound />;
        }

        return (
                <>
                        <Container>
                                <div className="grid max-h-screen overflow-y-auto lg:grid-cols-3 sm:grid-cols-2 text-white pb-20 sm:pb-0">
                                        {likedVideos?.map((video) => (
                                                <VideoList
                                                        key={video.videoId}
                                                        avatar={
                                                                video.owner
                                                                        ?.avatar
                                                                        ?.secure_url
                                                        }
                                                        duration={
                                                                video.duration
                                                        }
                                                        title={video.title}
                                                        thumbnail={
                                                                video.thumbnail
                                                                        ?.secure_url
                                                        }
                                                        createdAt={
                                                                video.createdAt
                                                        }
                                                        views={video.views}
                                                        channelName={
                                                                video.owner
                                                                        ?.userName
                                                        }
                                                        videoId={video._id}
                                                />
                                        ))}
                                </div>
                        </Container>
                </>
        );
}

export default LikedVideos;
