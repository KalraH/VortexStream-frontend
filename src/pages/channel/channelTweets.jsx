import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../../store/slices/tweet.slice";
import { TweetAndComment, TweetsList } from "../../components/index";

function ChannelTweets() {
        const dispatch = useDispatch();
        const authId = useSelector((state) => state.auth?.userData?._id);
        const userId = useSelector((state) => state.user?.profileData?._id);
        const tweets = useSelector((state) => state.tweet?.tweets);

        useEffect(() => {
                if (userId) dispatch(getUserTweets(userId));
        }, [dispatch, userId]);

        return (
                <>
                        {authId === userId && <TweetAndComment tweet={true} />}
                        {tweets?.map((tweet) => (
                                <TweetsList
                                        key={tweet?._id}
                                        avatar={
                                                tweet?.owner?.avatar?.secure_url
                                        }
                                        content={tweet?.content}
                                        createdAt={tweet?.createdAt}
                                        likesCount={tweet?.likesCount}
                                        tweetId={tweet?._id}
                                        userName={tweet?.owner?.userName}
                                        isLiked={tweet?.isLiked}
                                />
                        ))}
                </>
        );
}

export default ChannelTweets;
