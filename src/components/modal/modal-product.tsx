import { Row, Col, Image, Space, Typography, Button } from "antd";
import React, { FC } from "react";
import { CModalProps, StyledModal } from ".";
import { IProduct } from "../../interface/IProduct";

export interface CModalProductProps extends CModalProps {
  top?: number;
  children?: React.ReactNode;
}

export const CModalProduct: FC<CModalProductProps> = ({
  title,
  footer = null,
  open,
  onCancel,
  onOk,
  closable = false,
  top = 150,
  children,
  ...props
}) => {
  return (
    <StyledModal
      style={{
        top: top,
      }}
      width={"750px"}
      footer={footer}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      closable={closable}
      {...props}
    >
      {children}
    </StyledModal>
  );
};

interface displayProductProps extends IProduct {}

export const DisplayProduct: FC<{ product?: displayProductProps }> = ({
  product,
}) => {
  return (
    <React.Fragment>
      <Row align="stretch">
        <Col>
          <Image
            src={product?.img}
            alt="preview-img"
            className="!h-[400px] !w-[350px] object-cover"
          />
        </Col>
        <Col
          style={{
            textAlign: "start",
            marginLeft: 30,
          }}
          className=""
        >
          <Space direction="vertical">
            <Typography.Title level={4}>{product?.name}</Typography.Title>
            <Typography.Title
              level={4}
            >{`$${product?.price}`}</Typography.Title>
            <Typography.Text>{`${product?.detail}` || `-`}</Typography.Text>
            <Button type="primary" className="w-[320px]">
              เก็บใส่ตะกร้า
            </Button>
          </Space>
        </Col>
      </Row>
    </React.Fragment>
  );
};
