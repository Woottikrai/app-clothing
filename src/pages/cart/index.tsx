import { XMarkIcon } from "@heroicons/react/20/solid";
import { Row, Col, Button, Space, Typography, Divider } from "antd";
import React from "react";
import { FC } from "react";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import OptionalLayout from "../../components/layouts/optionalLayout";
import { breadcrumbNameMap } from "../../routes/breadcrumb";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    inStock: false,
    leadTime: "3–4 weeks",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

export default function Cart() {
  const HeadTitleProps = {
    // title: "เพิ่มสินค้า",
    breadcrumbNameMap: breadcrumbNameMap,
  };

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
  product: any[];
}

const CartProduct: FC<ICartProduct> = ({ product }) => {
  return (
    <>
      <OptionalLayout
        className="overflow-auto h-[550px] rounded-lg border"
        items={product}
        renderItem={({ item, key }: { item: any; key?: string | number }) => (
          <CartList product={product} key={key} />
        )}
      />
    </>
  );
};

interface ICardList {
  product: any;
}

const CartList: FC<ICardList> = ({ product }) => {
  return (
    <React.Fragment>
      <li key={product.id} className="flex py-6 sm:py-10 p-5">
        <div className="flex-shrink-0">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm">
                  <a
                    href={product.href}
                    className="font-medium text-gray-700 hover:text-gray-800"
                  >
                    {product.name}
                  </a>
                </h3>
              </div>
              <div className="mt-1 flex text-sm">
                <p className="text-gray-500">{product.color}</p>
                {product.size ? (
                  <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                    {product.size}
                  </p>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </div>

            <div className="mt-4 sm:mt-0 sm:pr-9">
              <div className="absolute right-0 top-0">
                <button
                  type="button"
                  className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
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
