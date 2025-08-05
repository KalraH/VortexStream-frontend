import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Controller } from "react-hook-form";

function GetImagePreview({
        name,
        image,
        label,
        control,
        className,
        cameraSize = 20,
        defaultValue = "",
        cameraIcon = false,
}) {
        const [preview, setPreview] = useState(null);

        const handlePreview = (e) => {
                const files = e.target.files;
                setPreview(URL.createObjectURL(files[0]));
                return files;
        };
        return (
                <>
                        <div className="w-full">
                                <label
                                        htmlFor={name}
                                        className="cursor-pointer relative flex flex-col justify-center items-start"
                                >
                                        {label && (
                                                <label className="inline-block mb-2 pl-1">
                                                        {label}
                                                </label>
                                        )}
                                        {/* <div className="relative flex justify-center items-center"> */}
                                        <img
                                                src={preview || image}
                                                className={className}
                                        />
                                        {cameraIcon && (
                                                <FaCamera
                                                        size={cameraSize}
                                                        className="hover:text-lime-500 absolute inline-flex justify-center items-center w-full"
                                                />
                                        )}
                                        {/* </div> */}
                                        <Controller
                                                name={name}
                                                control={control}
                                                defaultValue={
                                                        defaultValue || ""
                                                }
                                                render={({
                                                        field: { onChange },
                                                }) => (
                                                        <input
                                                                id={name}
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(
                                                                        e
                                                                ) => {
                                                                        onChange(
                                                                                handlePreview(
                                                                                        e
                                                                                )
                                                                        );
                                                                }}
                                                        />
                                                )}
                                                rules={{
                                                        required: `${name} is required`,
                                                }}
                                        />
                                </label>
                        </div>
                </>
        );
}

export default GetImagePreview;
