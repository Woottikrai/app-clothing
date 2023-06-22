import { NumberOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Image,
  Space,
  Typography,
  Button,
  FormInstance,
  InputNumber,
  Form,
} from "antd";
import React, { FC } from "react";
import { CModalProps, StyledModal } from ".";
import { IProduct } from "../../interface/IProduct";
import { useListProduct } from "../../provider/listProduct/provider.listProcuts";

export interface CModalProductProps extends CModalProps {
  top?: number;
  children?: React.ReactNode;
  form?: FormInstance;
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
  form,
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

interface displayProductProps extends IProduct {
  form?: FormInstance;
}

export const DisplayProduct: FC<{ product?: displayProductProps }> = ({
  product,
}) => {
  const { onOK, modalListProduct } = useListProduct();

  return (
    <React.Fragment>
      <Form form={modalListProduct} onFinish={onOK}>
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
              <Form.Item name={"quantity"} rules={[{ required: true }]}>
                กรอกจำนวน <InputNumber
                  prefix={<NumberOutlined />}
                  min={0}
                  max={99}
                  size={"middle"}
                />
              </Form.Item>

              <Button type="primary" className="w-[320px]" htmlType="submit">
                เก็บใส่ตะกร้า
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};
