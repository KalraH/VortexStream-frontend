import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const NoSubscribersFound = ({ text }) => {
	return (
		<div className="flex flex-col pb-20 items-center justify-center text-white h-screen">
			<FaPlayCircle size={45} className="text-lime-500" />
			<p className="mt-4 text-lg">
				You have no Subscribers.
			</p>
			<p className="">{text && text}</p>
		</div>
	);
};

export default NoSubscribersFound;
