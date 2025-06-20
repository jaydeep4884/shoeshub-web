import React from "react";
import { List, Skeleton } from "antd";

const ProductDetailSkeleton = () => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={[1]} // show only 1 skeleton item
      renderItem={(_, index) => (
        <List.Item key={index}>
          <Skeleton loading={true} active avatar paragraph={{ rows: 4 }} />
        </List.Item>
      )}
    />
  );
};

export default ProductDetailSkeleton;
