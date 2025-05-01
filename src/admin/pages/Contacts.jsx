import React from "react";
import { Table } from "antd";

const Contacts = () => {
  return (
    <Table
      dataSource={[]}
      columns={[
        { title: "Contact ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name" },
        { title: "Message", dataIndex: "message" },
      ]}
    />
  );
};

export default Contacts;