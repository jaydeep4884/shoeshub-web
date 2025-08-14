import React from "react";
import bgBody from "../img/Banners/bg-body2.png";

function Background({ children }) {
  return (
    <div
      className="w-full bg-cover h-auto"
      style={{ backgroundImage: `url(${bgBody})` }}
    >
      {children}
    </div>
  );
}

export default Background;
