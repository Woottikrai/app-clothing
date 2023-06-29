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
  Divider,
} from "antd";
import React, { FC } from "react";
import { CModalProps, StyledModal } from ".";
import { ICart } from "../../interface/ICart";
import { IProduct } from "../../interface/IProduct";
import { CartList, OrderSummary } from "../../pages/cart";
import { useListProduct } from "../../provider/listProduct/provider.listProcuts";
import OptionalLayout from "../layouts/optionalLayout";

export interface CModalProductProps extends CModalProps {
  top?: number;
  children?: React.ReactNode;
  form?: FormInstance;
  listOrder?: boolean;
}

export const CModalProduct: FC<CModalProductProps> = ({
  title,
  footer = null,
  open,
  onCancel,
  onOk,
  listOrder,
  closable = false,
  top = listOrder ? 80 : 150,
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
  listOrder?: boolean;
  itemsOrder?: {
    orderId: string;
    items: ICart[];
  };
}

export const DisplayProduct: FC<{ product?: displayProductProps }> = ({
  product,
}) => {
  const { onOK, modalListProduct } = useListProduct();
  const { itemsOrder } = product || {};

  return (
    <React.Fragment>
      {!!product?.listOrder ? (
        <>
          <OptionalLayout
            className={`${
              !!product.listOrder && "rounded-t-lg border-b-0"
            } overflow-scroll h-[285px]   border`}
            items={itemsOrder?.items}
            renderItem={({
              item,
              key,
            }: {
              item: any;
              key?: string | number;
            }) => <CartList product={{ ...item, listOrder: true }} key={key} />}
          />
          <OrderSummary products={product.itemsOrder?.items} listOrder={true} />
        </>
      ) : (
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
                  <InputNumber
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
      )}
    </React.Fragment>
  );
};
