import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";

function Notfound() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, the page you visited does not exist."
        style={{ fontWeight: "bold " }}
        extra={
          <Button type="primary" onClick={() => navigate("/home")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}

export default Notfound;
