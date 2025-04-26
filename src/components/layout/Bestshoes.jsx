import { Box, Container, Rating } from "@mui/material";
import React from "react";
import { Card } from "antd";
import shoes1 from "../img/shoes/shoes-01.png";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";

function Bestshoes() {
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
            <Box className="grid grid-cols-4 !gap-x-4">
              <Box className="relative">
                {/* Icons */}
                <Box className="flex flex-col gap-y-1 absolute top-3 right-3 z-10">
                  <FavoriteSharpIcon style={{ fill: "#B0BABF" }} />
                  <BookmarkAddSharpIcon style={{ fill: "#B0BABF" }} />
                </Box>

                <Card
                  className="shadow-lg w-full overflow-hidden rounded-2xl "
                  hoverable
                  cover={
                    <img
                      alt="Shoes"
                      src={shoes1}
                      className="w-full pt-16 object-cover h-[200px]"
                    />
                  }
                >
                  <p>Air Zoom Pegasus 37 Running Shoes</p>
                  <h3 className="text-lg font-bold mb-1">$1,599</h3>
                  <Rating
                    name="read-only"
                    defaultValue={3}
                    size="small"
                    readOnly
                  />
                </Card>
              </Box>

              <Box className="relative">
                {/* Icons */}
                <Box className="flex flex-col gap-y-1 absolute top-3 right-3 z-10">
                  <FavoriteSharpIcon style={{ fill: "#B0BABF" }} />
                  <BookmarkAddSharpIcon style={{ fill: "#B0BABF" }} />
                </Box>

                <Card
                  className="shadow-lg w-full overflow-hidden rounded-2xl "
                  hoverable
                  cover={
                    <img
                      alt="Shoes"
                      src={shoes1}
                      className="w-full pt-16
 object-cover h-[200px]"
                    />
                  }
                >
                  <p>Air Zoom Pegasus 37 Running Shoes</p>
                  <h3 className="text-lg font-bold mb-1">$1,599</h3>
                  <Rating
                    name="read-only"
                    defaultValue={3}
                    size="small"
                    readOnly
                  />
                </Card>
              </Box>

              <Box className="relative">
                {/* Icons */}
                <Box className="flex flex-col gap-y-1 absolute top-3 right-3 z-10">
                  <FavoriteSharpIcon style={{ fill: "#B0BABF" }} />
                  <BookmarkAddSharpIcon style={{ fill: "#B0BABF" }} />
                </Box>

                <Card
                  className="shadow-lg w-full overflow-hidden rounded-2xl "
                  hoverable
                  cover={
                    <img
                      alt="Shoes"
                      src={shoes1}
                      className="w-full pt-16
 object-cover h-[200px]"
                    />
                  }
                >
                  <p>Air Zoom Pegasus 37 Running Shoes</p>
                  <h3 className="text-lg font-bold mb-1">$1,599</h3>
                  <Rating
                    name="read-only"
                    defaultValue={3}
                    size="small"
                    readOnly
                  />
                </Card>
              </Box>

              <Box className="relative">
                {/* Icons */}
                <Box className="flex flex-col gap-y-1 absolute top-3 right-3 z-10">
                  <FavoriteSharpIcon style={{ fill: "#B0BABF" }} />
                  <BookmarkAddSharpIcon style={{ fill: "#B0BABF" }} />
                </Box>

                <Card
                  className="shadow-lg w-full overflow-hidden rounded-2xl "
                  hoverable
                  cover={
                    <img
                      alt="Shoes"
                      src={shoes1}
                      className="w-full pt-16
 object-cover h-[200px]"
                    />
                  }
                >
                  <p>Air Zoom Pegasus 37 Running Shoes</p>
                  <h3 className="text-lg font-bold mb-1">$1,599</h3>
                  <Rating
                    name="read-only"
                    defaultValue={3}
                    size="small"
                    readOnly
                  />
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Bestshoes;
