import React from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const AddProduct = () => {
  return (
    <Form layout="vertical" className="max-w-xl">
      <Form.Item label="Product Name" name="name">
        <Input placeholder="Enter product name" />
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Select placeholder="Select category">
          <Option value="men">Men</Option>
          <Option value="women">Women</Option>
          <Option value="kids">Kids</Option>
          <Option value="couple">Couple</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Price" name="price">
        <Input type="number" placeholder="Enter price" />
      </Form.Item>
      <Form.Item label="Image URL" name="image">
        <Input placeholder="Enter image URL" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Add Product</Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;