import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../store/slices/subscription.slice";
import { VideoList, Avatar, NoSubscriptionFound } from "../components/index";

function MySubscriptions() {
	const dispatch = useDispatch();
	const subscriptions = useSelector(
		(state) => state.subscription?.mySubscriptions
	);
	const subscriberId = useSelector((state) => state.auth?.userData?._id);
	useEffect(() => {
		if (subscriptions) {
			dispatch(getSubscribedChannels(subscriberId));
			window.scrollTo(0, 0);
		}
	}, [dispatch, subscriberId]);

	if (subscriptions?.length === 0) {
		return <NoSubscriptionFound />;
	}

	return (
		<>
			<div className="flex gap-2 p-2 text-white items-center bg-[#222222]">
				{subscriptions?.map((subscription) => (
					<div
						key={
							subscription
								?.subscribedChannel
								?._id
						}
						className="flex flex-col items-center overflow-x-auto"
					>
						<Avatar
							src={
								subscription
									?.subscribedChannel
									?.avatar
									.secure_url
							}
							channelName={
								subscription
									?.subscribedChannel
									?.userName
							}
						/>
						<h5 className="text-xs">
							{
								subscription
									?.subscribedChannel
									?.userName
							}
						</h5>
					</div>
				))}
			</div>

			<div className="text-white pb-20 sm:pb-0 w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-auto">
				{subscriptions?.map((subscription) => (
					<Link
						to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
						key={
							subscription
								?.subscribedChannel
								?._id
						}
					>
						{subscription?.subscribedChannel
							?.latestVideo && (
							<VideoList
								key={
									subscription
										?.subscribedChannel
										?._id
								}
								avatar={
									subscription
										?.subscribedChannel
										?.avatar
										.secure_url
								}
								duration={
									subscription
										?.subscribedChannel
										?.latestVideo
										?.duration
								}
								title={
									subscription
										?.subscribedChannel
										?.latestVideo
										?.title
								}
								thumbnail={
									subscription
										?.subscribedChannel
										?.latestVideo
										?.thumbnail
										?.secure_url
								}
								createdAt={
									subscription
										?.subscribedChannel
										?.latestVideo
										?.createdAt
								}
								views={
									subscription
										?.subscribedChannel
										?.latestVideo
										?.views
								}
								channelName={
									subscription
										?.subscribedChannel
										?.userName
								}
								videoId={
									subscription
										?.subscribedChannel
										?.latestVideo
										?._id
								}
							/>
						)}
					</Link>
				))}
			</div>
		</>
	);
}

export default MySubscriptions;
