import React from "react";

function PageBanner(props) {
  return (
    <>
      <div className="bg-[#e9dfdf] min-h-24">
        <img
          className="h-auto w-full object-contain"
          src={props.path}
          alt="Page Banner"
        />
      </div>
    </>
  );
}

export default PageBanner;
