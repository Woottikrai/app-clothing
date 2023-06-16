import { Card } from "antd";
import React from "react";

interface Props {
  children?: React.ReactNode;
  height?: number | string;
  className?: string;
}

const Container = ({ children, height = "", className }: Props) => {
  return (
    <Card
      style={{ height: height, width: "100%" }}
      className={`${className} min-h-full !px-7 py-10`}
    >
      {children}
    </Card>
  );
};

export default Container;
