import React from "react";
import { Table } from "antd";

const Products = () => {
  return (
    <Table
      dataSource={[]}
      columns={[
        { title: "Product Name", dataIndex: "name" },
        { title: "Category", dataIndex: "category" },
        { title: "Price", dataIndex: "price" },
        { title: "Action", render: () => <a href="/">Edit | Delete</a> },
      ]}
    />
  );
};

export default Products;
