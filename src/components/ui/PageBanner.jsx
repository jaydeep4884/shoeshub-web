import React from "react";

function PageBanner(props) {
  return (
    <>
      <div className="bg-[#e9dfdf] min-h-14 lg:min-h-24">
        <img
          className="h-[150px] lg:h-auto w-full object-cover"
          src={props.path}
          alt="Page Banner"
        />
      </div>
    </>
  );
}

export default PageBanner;
