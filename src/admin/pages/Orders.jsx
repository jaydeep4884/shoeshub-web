import React from "react";
import { Table } from "antd";

const Orders = () => {
  return (
    <Table
      dataSource={[]}
      columns={[
        { title: "Order ID", dataIndex: "id" },
        { title: "Customer", dataIndex: "customer" },
        { title: "Status", dataIndex: "status" },
        { title: "Payment", dataIndex: "payment" },
      ]}
    />
  );
};

export default Orders;