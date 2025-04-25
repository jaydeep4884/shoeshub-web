import React from "react";
import notfoundImg from "../img/404-error.svg";
import { Image, Typography } from "antd";
import { Link } from "react-router";
function NotFound() {
  return (
    <div
      className="m-auto"
      style={{ maxWidth: "500px", paddingTop: "50px", textAlign: "center" }}
    >
      <Image
        src={notfoundImg}
        preview={false}
        style={{ marginBottom: "20px" }}
      />
      <Typography.Text style={{ fontWeight: "500", fontSize: "20px" }}>
        You Lost? <Link to="/">Home</Link>
      </Typography.Text>
    </div>
  );
}

export default NotFound;
