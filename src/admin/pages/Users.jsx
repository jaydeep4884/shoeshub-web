import React, { useContext, useEffect, useState } from "react";
import { Table, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { token } from "../../assets/contexts";
import Loader from "../../components/ui/Loader";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const Token = useContext(token);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://myapigenerator.onrender.com/auth/authUser",
      {
        headers: { Authorization: Token },
      }
    );
    const myUsers = res.data?.Data || [];
    setUserData(myUsers);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Table
      rowKey="_id"
      dataSource={userData}
      columns={[
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        {
          title: "Password",
          dataIndex: "password",
          render: (text, record) => {
            const visible = visiblePasswords[record._id];
            return (
              <div className="flex items-center justify-between gap-2">
                <span>{visible ? text : "⁕".repeat(text.length)}</span>
                <Button
                  type="text"
                  size="small"
                  icon={visible ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                  onClick={() => togglePasswordVisibility(record._id)}
                />
              </div>
            );
          },
        },
      ]}
      pagination={false}
      bordered
      locale={{ emptyText: loading ? <Loader /> : "No User Found !" }}
    />
  );
};

export default Users;
