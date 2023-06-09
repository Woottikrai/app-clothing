import { Card, CardProps } from "antd";
import { FC } from "react";

interface CCardProps extends CardProps {
  children: React.ReactNode;
  className?: string;
}

const CCard: FC<CCardProps> = ({ children, className }, props) => {
  return (
    <Card {...props} style={{ height: "100%" }} className={`${className}`}>
      {children}
    </Card>
  );
};

export default CCard;
