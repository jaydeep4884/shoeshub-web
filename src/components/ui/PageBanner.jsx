import React from "react";

function PageBanner(props) {
  return (
    <>
      <img
        className="h-auto w-full object-cover"
        src={props.path}
        alt="Page Banner"
      />
    </>
  );
}

export default PageBanner;
