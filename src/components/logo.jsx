import React from "react";
import { Link } from "react-router-dom";
import { IoIosVideocam } from "react-icons/io";

function Logo({ size = "30" }) {
        return (
                <>
                        <Link to={"/"} className="flex gap-2 items-center">
                                <IoIosVideocam size={size} color="lime" />
                                <span className="font-bold text-white">
                                        VortexStream
                                </span>
                        </Link>
                </>
        );
}

export default Logo;
