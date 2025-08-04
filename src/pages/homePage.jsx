import HomeSkeleton from "../skeleton/homeSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { VideoList, Container } from "../components/index";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useCallback, useEffect, useState } from "react";
import { getAllVideos, makeVideosNull } from "../store/slices/video.slice";

function HomePage() {
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
					console.error(
						"Error loading more videos:",
						error
					);
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
				loader={isLoading && <HomeSkeleton />}
				scrollableTarget="scrollable-container"
			>
				<div
					className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-au"
					id="scrollable-container"
				>
					{videos?.map((video) => (
						<VideoList
							key={video._id}
							avatar={
								video
									?.owner
									?.avatar
									?.secure_url ||
								"Unknown_Owner"
							}
							duration={
								video?.duration
							}
							title={video.title}
							thumbnail={
								video?.thumbnail
									?.secure_url
							}
							createdAt={
								video?.createdAt
							}
							views={video.views}
							channelName={
								video?.owner
									?.userName ||
								"Unknown_Channel"
							}
							videoId={video._id}
						/>
					))}
				</div>
			</InfiniteScroll>
		</Container>
	);
}

export default HomePage;
