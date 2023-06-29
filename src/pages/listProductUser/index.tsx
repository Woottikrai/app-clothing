import React, { FC } from "react";
import { IColor, IProduct, IProducttype, ISize, ISuitability, useColor } from "../../interface/IProduct";
import { getAllColor, getProductAll, getProducttypeAll, getSizeAll, getSuitabilityAll, useGetProductAll } from "../../services/auth/product/product.axios";
import OptionalLayout from "../../components/layouts/optionalLayout";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import { breadcrumbNameMap } from "../../routes/breadcrumb";
import { Col, Form, Row, Select, Typography } from "antd";
import {
  CModalProduct,
  DisplayProduct,
} from "../../components/modal/modal-product";
import WithListProduct, {
  useListProduct,
} from "../../provider/listProduct/provider.listProcuts";

function ListProduct() {
  const products = useGetProductAll()
  const { open, setOpen, cart, setCart } = useListProduct();
  const HeadTitleProps = {
    breadcrumbNameMap: breadcrumbNameMap,
  };

  interface cardProductUser extends IProduct { }

  const CardProductUser: FC<{
    product?: cardProductUser;
    onClick: () => void;
  }> = ({ product, onClick }) => {
    return (
      <React.Fragment>
        <div key={product?.id} className="shadow-sm rounded-lg">
          <div className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-t-lg z-20">
              <img
                src={product?.img}
                className="h-full w-full object-cover object-center !cursor-pointer hover:scale-125 transition-all ease-linear delay-75"
                onClick={onClick}
              />
            </div>
            <Row align="stretch" justify="space-between" className="px-5 pt-5">
              <Col>
                <Typography.Title
                  ellipsis={{ tooltip: true }}
                  level={5}
                  style={{
                    color: "#E7C98D",
                  }}
                >
                  <div className="mb-2.5">{product?.name}</div>
                  <span>${product?.price}</span>
                </Typography.Title>
              </Col>
              <Col style={{
                color: "#E7C98D",
              }}>
                <span>สี {product?.color?.color_name}</span>
              </Col>
            </Row>
            <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4 cursor-pointer z-0">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const [getColor, setColor] = React.useState<Array<IColor>>([]);
  const [getProducttype, setProducttype] = React.useState<Array<IProducttype>>(
    []
  );
  const [getSize, setSize] = React.useState<Array<ISize>>([]);
  const [getSuitability, setSuitability] = React.useState<Array<ISuitability>>(
    []
  );
  React.useEffect(() => {
    (async () => {
      const res1 = await getAllColor();
      setColor(res1);

      const res2 = await getProducttypeAll();
      setProducttype(res2);

      const res3 = await getSizeAll();
      setSize(res3);

      const res4 = await getSuitabilityAll();
      setSuitability(res4);
    })();
  }, []);
  return (
    <Container>
      <HeadTitle {...HeadTitleProps} />
      <Form>
        <Row>
          <Form.Item

            name="producttypeId"
            label=""
          >
            <Select
              options={getProducttype?.map((it) => {
                return { value: it.id, label: it.producttype_name };
              })}
              placeholder="เลือกหมวดหมู่ เพื่อค้นหา"
            />
          </Form.Item>{" "}
          <Form.Item

            name="suitabilityId"
            label=""
          >
            <Select
              options={getSuitability?.map((it) => {
                return { value: it.id, label: it.suitability_name };
              })}
              placeholder="เลือกความเหมาะสม เพื่อค้นหา"
            />
          </Form.Item>{" "}
        </Row>
      </Form>

      <OptionalLayout
        items={products.data?.data}
        className="mt-8 grid grid-cols-1  gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        renderItem={({
          item,
          key,
        }: {
          item: IProduct;
          key?: string | number;
        }) => (
          <CardProductUser
            product={item}
            key={key}
            onClick={() => {
              setCart(item);
              setOpen(true);
            }}
          />
        )}
      />
      <CModalProduct
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        closable={true}
      >
        <DisplayProduct product={{ ...cart }} />
      </CModalProduct>
    </Container>
  );
}

export default ListProduct;
