import { Box, Container } from "@mui/material";
import React from "react";
import { Card, Rate } from "antd";
import shoes1 from "../img/shoes/shoes-01.png";
import like from "../img/icons/like-icon.svg";
import save from "../img/icons/save-icon.svg";

function Bestshoes() {
  const { Meta } = Card;
  return (
    <>
      <Container maxWidth="lg">
        <Box className="py-5 sm:py-14">
          <Box>
            {/* Heading */}
            <h3 className="font-medium text-xl text-[#252C32] border-b-2 inline-block border-[#252C32] mb-9">
              Best of Shoes
            </h3>

            {/* Card */}
            <Box className="relative w-[300px]">
              {/* Icons */}
              <Box className="absolute top-3 right-3 z-10">
                <img src={like} alt="like-icon" />
                <img src={save} alt="save-icon" />
              </Box>

              <Card
                className="shadow-lg w-full overflow-hidden rounded-2xl pt-10"
                hoverable
                cover={
                  <img
                    alt="Shoes"
                    src={shoes1}
                    className="w-full pt-12 object-cover h-[200px]"
                  />
                }
                actions={[
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                    $1,599
                  </div>,
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Rate
                      disabled
                      defaultValue={5}
                      style={{ fontSize: "14px", color: "#FACC15" }}
                    />
                    <span style={{ fontSize: "14px", color: "#6B7280" }}>
                      243
                    </span>
                  </div>,
                ]}
              >
                <Meta
                  title={
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#111827",
                      }}
                    >
                      Air Zoom Pegasus 37 Running Shoes
                    </div>
                  }
                  description=""
                />
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Bestshoes;
