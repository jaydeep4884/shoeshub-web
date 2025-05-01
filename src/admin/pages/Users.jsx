import React from "react";
import { Table } from "antd";

const Users = () => {
  return (
    <Table
      dataSource={[]}
      columns={[
        { title: "User ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
      ]}
    />
  );
};

export default Users;
