import { XMarkIcon } from "@heroicons/react/20/solid";
import { Row, Col, Button, Space, Typography, Divider, Image } from "antd";
import React from "react";
import { FC } from "react";
import { useQueryClient } from "react-query";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import OptionalLayout from "../../components/layouts/optionalLayout";
import { ICart } from "../../interface/ICart";
import { useAuthContext } from "../../provider/auth/provider.auth";
import { breadcrumbNameMap } from "../../routes/breadcrumb";
import {
  getCartByUser,
  useDeleteCart,
  useGetCartByUser,
} from "../../services/auth/cart/cart.axios";


export default function Cart() {
  const HeadTitleProps = {
    // title: "เพิ่มสินค้า",
    breadcrumbNameMap: breadcrumbNameMap,
  };
  const { profile } = useAuthContext();
  const { data: products } = useGetCartByUser(profile?.id);

  return (
    <Container>
      <HeadTitle {...HeadTitleProps} />
      <Row gutter={[24, 12]}>
        <Col span={16}>
          <CartProduct product={products} />
        </Col>
        <Col span={8}>
          <OrderSummary />
        </Col>
      </Row>
    </Container>
  );
}

interface ICartProduct {
  product?: ICart[];
}

const CartProduct: FC<ICartProduct> = ({ product }) => {
  return (
    <>
      <OptionalLayout
        className="overflow-auto h-[550px] rounded-lg border"
        items={product}
        renderItem={({ item, key }: { item: any; key?: string | number }) => (
          <CartList product={item} key={key} />
        )}
      />
    </>
  );
};

const CartList: FC<{ product?: ICart }> = ({ product }) => {
  const qClient = useQueryClient();
  const deleteCart = useDeleteCart();
  const onDelete = () => {
    deleteCart.mutate(product?.id, {
      onSuccess: () => {
        qClient.invalidateQueries(["cart"]);
      },
    });
  };
  return (
    <React.Fragment>
      <li key={product?.orderId} className="flex py-6 sm:py-10 p-5">
        <div className="flex-shrink-0">
          <Image
            src={product?.product.img}
            alt={"product-img"}
            className="!h-52 !w-52 !rounded-md !object-cover !object-center !sm:h-48 !sm:w-48"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm">
                  <a className="font-medium text-gray-700 hover:text-gray-800">
                    {product?.product.name}
                  </a>
                </h3>
              </div>
              <div className="mt-1 flex text-sm">
                <p className="text-gray-500">red</p>
                {product?.product.size ? (
                  <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                    {/* {product.product.size} */} L
                  </p>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product?.product.price}
              </p>
            </div>

            <div className="mt-4 sm:mt-0 sm:pr-9">
              <div className="absolute right-0 top-0">
                <button
                  type="button"
                  className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                  onClick={onDelete}
                >
                  <span className="sr-only">Remove</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

interface IOrderSummary {
  summary?: number;
}

const OrderSummary: FC<IOrderSummary> = ({ summary }) => {
  return (
    <React.Fragment>
      <Space
        aria-labelledby="summary-heading"
        direction="vertical"
        className=" w-full rounded-lg border p-5"
      >
        <Typography.Title
          level={2}
          id="summary-heading"
          className="text-lg font-medium text-gray-900"
        >
          Order summary
        </Typography.Title>

        <dl className="mt-6 space-y-4">
          <Row align={"middle"} justify="space-between">
            <Col className="text-sm text-gray-600">Total</Col>
            <Col className="text-sm font-medium text-gray-900">
              {`${summary || "-"}`}
            </Col>
          </Row>
          <Divider
            style={{
              fontSize: 5,
            }}
          />
          <Row align={"middle"} justify="space-between">
            <Col className="text-base font-medium text-gray-900">
              Order total
            </Col>
            <Col className="text-base font-medium text-gray-900">
              {`${summary || "-"}`}
            </Col>
          </Row>
        </dl>

        <div className="mt-6">
          <Button type="primary" className="w-full" size="large">
            สั่งซื้อ
          </Button>
        </div>
      </Space>
    </React.Fragment>
  );
};
