import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, NoSubscribersFound } from "../../components/index";
import { getUserChannelSubscribers } from "../../store/slices/subscription.slice";

function ChannelSubscribers() {
        const dispatch = useDispatch();
        const channelId = useSelector((state) => state.user.profileData?._id);
        const subscribers = useSelector(
                (state) => state.subscription.channelSubscribers
        );

        useEffect(() => {
                if (channelId) {
                        dispatch(getUserChannelSubscribers(channelId));
                }
        }, [dispatch, channelId]);

	if (subscribers?.length === 0) {
                return <NoSubscribersFound />;
        }

        return (
                <>
                        {subscribers?.map((subscriber) => (
                                <Link
                                        key={subscriber?.subscribedChannel
?._id}
                                        className="flex border-b border-slate-500 px-3 py-1 justify-between items-center text-white"
                                >
                                        <div className="flex gap-3 items-center">
                                                <Avatar
                                                        src={
                                                                subscriber
                                                                        ?.subscribedChannel
                                                                        ?.avatar
                                                                        .secure_url
                                                        }
                                                        channelName={
                                                                subscriber
                                                                        ?.subscribedChannel

                                                                        ?.userName
                                                        }
                                                />
                                                <div>
                                                        <h5 className="text-sm">
                                                                {
                                                                        subscriber
                                                                                ?.subscribedChannel
                                                                                ?.userName
                                                                }
                                                        </h5>
                                                        <span className="text-xs text-slate-400">
                                                                {
                                                                        subscriber
                                                                                ?.subscribedChannel
                                                                                ?.subscribersCount
                                                                }{" "}
                                                                Subscribers
                                                        </span>
                                                </div>
                                        </div>
                                        <div>
                                                <Button className="bg-lime-500 text-black text-xs py-1 px-2">
                                                        {subscriber?.subscribedChannel
                                                                ?.subscribedToSubscriber
                                                                ? "Subscribed"
                                                                : "subscribe"}
                                                </Button>
                                        </div>
                                </Link>
                        ))}
                </>
        );
}

export default ChannelSubscribers;
