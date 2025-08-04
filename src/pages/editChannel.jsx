import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ChannelHeader, ChannelNavigate, Spinner } from "../components/index";

function EditChannel() {
	const channel = useSelector((state) => state.auth?.userData);
	const loading = useSelector((state) => state.auth?.loading);
	window.scrollTo(0, 0);
	return (
		<>
			{loading && (
				<div className="w-full fixed top-20 flex justify-center z-20">
					<div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
						<Spinner />
						<span className="text-md font-bold text-white">
							wait dude...
						</span>
					</div>
				</div>
			)}

			{channel && (
				<ChannelHeader
					userName={channel?.userName}
					coverImage={
						channel?.coverImage.secure_url
					}
					avatar={channel?.avatar.secure_url}
					subscribedCount={
						channel?.channelsSubscribedToCount
					}
					fullName={channel?.fullName}
					subscribersCount={
						channel?.subcribersCount
					}
					isSubscribed={channel?.isSubscribed}
					channelId={channel?._id}
					edit={true}
				/>
			)}
			<ChannelNavigate edit={true} />
			<div className="flex-1 overflow-y-auto mb-20 sm:mb-0">
				<Outlet />
			</div>
		</>
	);
}

export default EditChannel;
