import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";

const Category = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setModalOpen(true)} type="primary">
        Create Category
      </Button>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modalOpen}
        // cancelButtonProps={}
        onCancel={() => setModalOpen(false)}
      >
        <Form layout="vertical" className="max-w-xl">
          <Form.Item label="Category Name" name="name">
            <Input placeholder="Enter Category name" />
          </Form.Item>

          <Form.Item>
            <Button onClick={() => setModalOpen(true)} type="primary">
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Category;
