import React, { FC } from "react";
import { IProduct, useColor } from "../../interface/IProduct";
import { getProductAll } from "../../services/auth/product/product.axios";
import OptionalLayout from "../../components/layouts/optionalLayout";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import { breadcrumbNameMap } from "../../routes/breadcrumb";
import { Col, Row, Typography } from "antd";
import {
  CModalProduct,
  DisplayProduct,
} from "../../components/modal/modal-product";
import WithListProduct, {
  useListProduct,
} from "../../provider/listProduct/provider.listProcuts";

function ListProduct() {
  const [getProduct, setProduct] = React.useState<Array<IProduct>>([]);
  const { open, setOpen, cart, setCart } = useListProduct();
  const HeadTitleProps = {
    breadcrumbNameMap: breadcrumbNameMap,
  };
  React.useEffect(() => {
    (async () => {
      const res = await getProductAll();
      setProduct(res.data);
    })();
  }, []);
  interface cardProductUser extends IProduct {}

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
              <Col>
                <div
                  style={{
                    backgroundColor: useColor.find(
                      (e) => e.id === product?.color?.id
                    )?.color,
                  }}
                  className="border p-2.5"
                ></div>
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

  return (
    <Container>
      <HeadTitle {...HeadTitleProps} />
      <OptionalLayout
        items={getProduct}
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
        <DisplayProduct product={cart} />
      </CModalProduct>
    </Container>
  );
}

export default ListProduct;
