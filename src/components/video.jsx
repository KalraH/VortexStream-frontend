import React from "react";

function Video({ src, poster, className = "" }) {
	return (
		<div className="w-full flex justify-center bg-black">
			<video
				src={src}
				poster={poster}
				autoPlay
				controls
				playsInline
				className={`w-full max-w-6xl h-auto object-contain ${className}`}
				style={{ minHeight: '300px', maxHeight: '80vh' }}
			>
				Your browser does not support the video tag.
			</video>
		</div>
	);
}

export default Video;
