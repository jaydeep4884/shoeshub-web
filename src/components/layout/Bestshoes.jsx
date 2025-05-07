import React from "react";
import { Box, Container, Rating } from "@mui/material";
import { Card } from "antd";
import shoes1 from "../img/shoes/shoes-01.png";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import { useNavigate } from "react-router";

const shoeData = [
  {
    name: "Air Zoom Pegasus 37 Running Shoes",
    price: "$1,599",
    image: shoes1,
    rating: 3,
  },
  {
    name: "Air Zoom Pegasus 37 Running Shoes",
    price: "$1,599",
    image: shoes1,
    rating: 3,
  },
  {
    name: "Air Zoom Pegasus 37 Running Shoes",
    price: "$1,599",
    image: shoes1,
    rating: 3,
  },
  {
    name: "Air Zoom Pegasus 37 Running Shoes",
    price: "$1,599",
    image: shoes1,
    rating: 3,
  },
];

function Bestshoes() {
  let navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Box className="py-5 sm:py-14">
        <h3 className="font-medium text-xl text-[#252C32] border-b-2 inline-block border-[#252C32] mb-9">
          Best of Shoes
        </h3>

        <Box className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {shoeData.map((shoe, index) => (
            <Box key={index} className="relative">
              {/* Icons */}
              <Box className="flex flex-col gap-y-1 absolute top-3 right-3 z-10">
                <FavoriteSharpIcon className="text-gray-400" />
                <BookmarkAddSharpIcon className="text-gray-400" />
              </Box>

              <Card
                className="shadow-lg w-full overflow-hidden rounded-2xl"
                hoverable
                onClick={() => navigate("/productdetail")}
                cover={
                  <img
                    alt={shoe.name}
                    src={shoe.image}
                    className="w-full pt-16 object-cover h-[150px] sm:h-[200px] "
                  />
                }
              >
                <p>{shoe.name}</p>
                <h3 className="text-lg font-bold mb-1">{shoe.price}</h3>
                <Rating
                  name="read-only"
                  value={shoe.rating}
                  size="small"
                  readOnly
                />
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Bestshoes;
