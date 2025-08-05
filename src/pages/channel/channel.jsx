import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from "../../store/slices/user.slice";
import { ChannelHeader, ChannelNavigate } from "../../components/index";

function Channel() {
        const dispatch = useDispatch();
        const { userName } = useParams();

        const channel = useSelector((state) => state.user?.profileData);
        useEffect(() => {
                if (userName) {
                        dispatch(userChannelProfile(userName));
                        window.scrollTo(0, 0);
                }
        }, [dispatch, userName]);

        return (
                <>
                        {channel && (
                                <ChannelHeader
                                        userName={userName}
                                        coverImage={
                                                channel?.coverImage?.secure_url
                                        }
                                        avatar={channel?.avatar?.secure_url}
                                        subscribedCount={
                                                channel?.channelsSubscribedToCount
                                        }
                                        fullName={channel?.fullName}
                                        subscribersCount={
                                                channel?.subscribercount
                                        }
                                        isSubscribed={channel?.isSubscribedFlag}
                                        channelId={channel?._id}
                                />
                        )}
                        <ChannelNavigate userName={userName} />
                        <div className="pb-20 sm:pb-0">
                                <Outlet />
                        </div>
                </>
        );
}

export default Channel;
