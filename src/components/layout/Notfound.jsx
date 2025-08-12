import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";
import PageContainer from "../ui/PageContainer";

function Notfound() {
  const navigate = useNavigate();
  return (
    <PageContainer>
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
    </PageContainer>
  );
}

export default Notfound;
