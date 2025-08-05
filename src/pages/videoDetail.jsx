import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideoById } from "../store/slices/video.slice";
import React, { useCallback, useEffect, useState } from "react";
import {
        cleanUpComments,
        getVideoComments,
} from "../store/slices/comment.slice";
import {
        CommentList,
        TweetAndComment,
        Video,
        Description,
        Spinner,
        InfiniteScroll,
        Navbar,
} from "../components/index";

function VideoDetail() {
        const dispatch = useDispatch();
        const { videoId } = useParams();
        const video = useSelector((state) => state.video?.video);
        const videoLoading = useSelector((state) => state.video?.loading); // Add this
        const comments = useSelector((state) => state.comment?.comments);
        const totalComments = useSelector(
                (state) => state.comment?.totalComments
        );
        const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
        const loading = useSelector((state) => state.comment?.loading);
        const [page, setPage] = useState(1);

        useEffect(() => {
                if (videoId) {
                        dispatch(getVideoById({ videoId }));
                        dispatch(getVideoComments({ videoId }));
                }

                return () => dispatch(cleanUpComments());
        }, [dispatch, videoId]);

        const fetchMoreComments = useCallback(() => {
                if (!loading && hasNextPage) {
                        dispatch(getVideoComments({ videoId, page: page + 1 }));
                        setPage((prev) => prev + 1);
                }
        }, [page, loading, hasNextPage, dispatch, videoId]);

        // Add loading state
        if (videoLoading || !video) {
                return (
                        <>
                                <Navbar />
                                <div className="flex justify-center items-center h-96">
                                        <Spinner width={10} />
                                </div>
                        </>
                );
        }

        // Add error state
        if (!video?.videoFile?.secure_url) {
                return (
                        <>
                                <Navbar />
                                <div className="flex justify-center items-center h-96 text-white">
                                        <p>Video not found or failed to load</p>
                                </div>
                        </>
                );
        }

        return (
                <div className="h-full overflow-y-auto">
                        <Navbar />
                        <Video
                                src={video.videoFile.secure_url}
                                poster={video.thumbnail.secure_url}
                        />
                        <Description
                                avatar={video.owner.avatar.secure_url}
                                channelName={video.owner.userName}
                                createdAt={video.createdAt}
                                description={video.description}
                                isSubscribed={video.owner.isSubscribed}
                                likesCount={video.likesCount}
                                subscribersCount={video.owner.subscribersCount}
                                title={video.title}
                                views={video.views}
                                key={video._id}
                                isLiked={video.isLiked}
                                videoId={video._id}
                                channelId={video.owner._id}
                        />
                        <div className="text-white font-semibold sm:px-5 px-3">
                                {totalComments} Comments
                        </div>
                        <TweetAndComment comment={true} videoId={video._id} />
                        <InfiniteScroll
                                fetchMore={fetchMoreComments}
                                hasNextPage={hasNextPage}
                        >
                                <div className="w-full pb-20">
                                        {comments?.map((comment) => (
                                                <CommentList
                                                        key={comment._id}
                                                        avatar={
                                                                comment.owner
                                                                        .avatar
                                                                        .secure_url
                                                        }
                                                        commentId={comment._id}
                                                        content={
                                                                comment.content
                                                        }
                                                        createdAt={
                                                                comment.createdAt
                                                        }
                                                        fullName={
                                                                comment.owner
                                                                        .fullName
                                                        }
                                                        isLiked={
                                                                comment.isLiked
                                                        }
                                                        likesCount={
                                                                comment.likesCount
                                                        }
                                                        userName={
                                                                comment.owner
                                                                        .userName
                                                        }
                                                />
                                        ))}
                                        {loading && (
                                                <div className="w-full flex justify-center items-center">
                                                        <Spinner width={10} />
                                                </div>
                                        )}
                                </div>
                        </InfiniteScroll>
                </div>
        );
}

export default VideoDetail;
