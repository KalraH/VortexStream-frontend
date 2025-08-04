import React, { useEffect } from "react";
import HomeSkeleton from "../skeleton/home.skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getWatchHistory } from "../store/slices/user.slice";
import { Container, NoVideosFound, VideoList } from "../components/index";

function History() {
	const loading = useSelector((state) => state.user?.loading);
	const videos = useSelector((state) => state.user?.history);
	const dispatch = useDispatch();
	window.scrollTo(0, 0);
	useEffect(() => {
		dispatch(getWatchHistory());
	}, [dispatch]);

	if (loading) {
		return <HomeSkeleton />;
	}

	if (videos?.length == 0) {
		return <NoVideosFound />;
	}

	if (videos && videos.length > 0) {
		return (
			<>
				<Container>
					<div className="grid max-h-screen pb-20 sm:pb-0 sm:m-0 overflow-y-auto lg:grid-cols-3 sm:grid-cols-2 text-white">
						{videos.map((video) => (
							<VideoList
								key={video._id}
								avatar={
									video
										.owner
										?.avatar
										?.secure_url
								}
								duration={
									video.duration
								}
								title={
									video.title
								}
								thumbnail={
									video
										?.thumbnail
										?.secure_url
								}
								createdAt={
									video.createdAt
								}
								views={
									video.views
								}
								channelName={
									video
										.owner
										.userName
								}
								videoId={
									video._id
								}
							/>
						))}
					</div>
				</Container>
			</>
		);
	}
	return <></>;
}

export default History;
