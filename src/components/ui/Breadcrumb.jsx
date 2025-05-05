import { Breadcrumbs } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { Link } from "react-router";

function Breadcrumb({ items = [] }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" className="mb-4 sm:!mb-6">
      {items.map((item, index) =>
        item.link ? (
          <Link key={index} to={item.link}>
            <Typography className="text-base cursor-pointer">
              {item.label}
            </Typography>
          </Link>
        ) : (
          <Typography key={index} className="text-base" color="text.primary">
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
