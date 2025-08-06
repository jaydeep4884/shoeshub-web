import React from "react";

function PageBanner({ path, isVideo = false }) {
  return (
    <div className="bg-[#e9dfdf] min-h-14 lg:min-h-24">
      {isVideo ? (
        <video
          className="h-[150px] lg:h-auto w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          className="h-[150px] lg:h-auto w-full object-cover"
          src={path}
          alt="Page Banner"
        />
      )}
    </div>
  );
}

export default PageBanner;
