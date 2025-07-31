import { Skeleton } from "antd";
import React from "react";

function ProductSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border rounded-md p-3 sm:p-4 flex flex-col gap-3"
        >
          <Skeleton.Image active style={{ width: "100%", height: 180 }} />
          <Skeleton.Input active style={{ width: "80%" }} size="small" />
          <Skeleton.Input active style={{ width: "60%" }} size="small" />
          <Skeleton.Input active style={{ width: "40%" }} size="small" />
        </div>
      ))}
    </>
  );
}

export default ProductSkeleton;
