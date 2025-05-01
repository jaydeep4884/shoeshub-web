import React from "react";
import { Form, Input, Button } from "antd";

const Settings = () => {
  return (
    <Form layout="vertical" className="max-w-xl">
      <Form.Item label="Admin Name">
        <Input placeholder="Admin Name" />
      </Form.Item>
      <Form.Item label="Email">
        <Input placeholder="Admin Email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Update Settings</Button>
      </Form.Item>
    </Form>
  );
};

export default Settings;
