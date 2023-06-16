import { NumberOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Image,
  Space,
  Typography,
  Button,
  FormInstance,
  Input,
  InputNumber,
  Form,
} from "antd";
import React, { FC } from "react";
import { CModalProps, StyledModal } from ".";
import { ICart } from "../../interface/ICart";
import { IProduct } from "../../interface/IProduct";
import { useAuthContext } from "../../provider/auth/provider.auth";
import { useListProduct } from "../../provider/listProduct/provider.listProcuts";
import { useAddToCart } from "../../services/auth/cart/cart.axios";
import { openNotification } from "../../util";
import { CInput } from "../input/c-input";

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
  const { onOK, open, setOpen } = useListProduct();
  const [modalListProduct] = Form.useForm();
  const { profile } = useAuthContext();
  const post = useAddToCart();

  const onFinish = (v: ICart) => {
    if (product) {
      const postItem = {
        ...v,
        sumPrice: v.quantity * product?.price,
        productId: product?.id,
        userId: profile?.id,
      };
      post.mutate(postItem, {
        onSuccess: () => {
          openNotification({ type: "success" });
          setOpen(false);
          modalListProduct.resetFields();
        },
        onError: () => {
          openNotification({ type: "error" });
        },
      });
    }
  };

  return (
    <React.Fragment>
      <Form form={modalListProduct} onFinish={onFinish}>
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
    </React.Fragment>
  );
};
