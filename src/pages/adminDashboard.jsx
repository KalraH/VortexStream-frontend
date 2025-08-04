import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAVideo } from "../store/slices/video.slice";
import { getChannelStats, getChannelVideos } from "../store/slices/dashboard.slice";
import {
	Navbar,
        Spinner,
        EditVideo,
        Container,
        VideoTable,
        UploadVideo,
        StatsSection,
        HeaderSection,
        DeleteConfirmation,
} from "../components/index";

function AdminDashboard() {
        const userName = useSelector((state) => state.auth.userData?.userName);
        const dashboard = useSelector((state) => state.dashboard.channelStats);
        const videos = useSelector((state) => state.dashboard.channelVideos);
        const uploaded = useSelector((state) => state.video.uploaded);
        const publishToggled = useSelector(
                (state) => state.video.publishToggled
        );
        const deleting = useSelector((state) => state.video.loading);

        const dispatch = useDispatch();
        const [videoDetails, setVideoDetails] = useState(null);
        const [popUp, setPopUp] = useState({
                uploadVideo: false,
                editVideo: false,
                deleteVideo: false,
        });

        const handleDeleteVideo = async () => {
                dispatch(deleteAVideo(videoDetails?._id));
                setPopUp((prev) => ({
                        ...prev,
                        deleteVideo: !prev.deleteVideo,
                }));
        };

        useEffect(() => {
                dispatch(getChannelStats());
        }, [dispatch]);

        useEffect(() => {
                dispatch(getChannelVideos());
        }, [dispatch, uploaded, publishToggled, deleting]);

        window.scrollTo(0, 0);

        return (
                <>
                        <Navbar />
                        <Container>
                                <div className=" w-full relative h-screen text-white space-y-5 z-10 py-4 px-1">
                                        {/* uploadVideoPopup */}
                                        {popUp.uploadVideo && (
                                                <UploadVideo
                                                        setUploadVideoPopup={
                                                                setPopUp
                                                        }
                                                />
                                        )}

                                        {/* editVideoPopup */}
                                        {popUp.editVideo && (
                                                <div className="w-full flex justify-center top-24 fixed z-20">
                                                        <EditVideo
                                                                setEditVideoPopup={
                                                                        setPopUp
                                                                }
                                                                title={
                                                                        videoDetails?.title
                                                                }
                                                                description={
                                                                        videoDetails?.description
                                                                }
                                                                videoId={
                                                                        videoDetails?._id
                                                                }
                                                        />
                                                </div>
                                        )}

                                        {/* deleteVideoPopup */}
                                        {popUp.deleteVideo && (
                                                <div className="w-full fixed top-52 flex justify-center z-20">
                                                        <DeleteConfirmation
                                                                video={true}
                                                                onCancel={() =>
                                                                        setPopUp(
                                                                                (
                                                                                        prev
                                                                                ) => ({
                                                                                        ...prev,
                                                                                        deleteVideo:
                                                                                                !prev.deleteVideo,
                                                                                })
                                                                        )
                                                                }
                                                                onDelete={
                                                                        handleDeleteVideo
                                                                }
                                                        />
                                                </div>
                                        )}

                                        {deleting && (
                                                <div className="w-full fixed top-20 flex justify-center z-20">
                                                        <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                                                                <Spinner />
                                                                <span className="text-md font-bold">
                                                                        Deleting
                                                                        video...
                                                                </span>
                                                        </div>
                                                </div>
                                        )}

                                        {/* Dashboard Header */}
                                        <HeaderSection
                                                userName={userName}
                                                setPopUp={setPopUp}
                                        />

                                        {/* channel stats section */}
                                        <StatsSection dashboard={dashboard} />

                                        {/* Table for managing channel videos */}
                                        <VideoTable
                                                videos={videos}
                                                setPopUp={setPopUp}
                                                setVideoDetails={
                                                        setVideoDetails
                                                }
                                        />
                                </div>
                        </Container>
                </>
        );
}

export default AdminDashboard;
