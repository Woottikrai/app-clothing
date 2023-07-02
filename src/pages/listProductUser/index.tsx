import React, { FC } from "react";
import { IColor, IProduct, IProductResult, IProducttype, ISize, ISuitability, useColor } from "../../interface/IProduct";
import { getAllColor, getProductAll, getProducttypeAll, getSizeAll, getSuitabilityAll, useGetProductAll } from "../../services/auth/product/product.axios";
import OptionalLayout from "../../components/layouts/optionalLayout";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import { breadcrumbNameMap } from "../../routes/breadcrumb";
import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import {
  CModalProduct,
  DisplayProduct,
} from "../../components/modal/modal-product";
import WithListProduct, {
  useListProduct,
} from "../../provider/listProduct/provider.listProcuts";
import { useQueryClient } from "react-query";

function ListProduct() {

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
                    color: "#000000",
                  }}
                >
                  <div className="mb-2.5">{product?.name}</div>
                  <span>{product?.price?.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })} </span>
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title
                  ellipsis={{ tooltip: true }}
                  level={5}
                  style={{
                    color: "#000000",
                  }}
                >
                  <div className="mb-2.5 ">สี{product?.color?.color_name}</div>
                  <div className="mb-2.5">ขนาด {product?.size?.size_name}</div>
                </Typography.Title>
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

  const [params, setParams] = React.useState<any>();

  const getAllProduct =
    useGetProductAll(params);

  const handleOnSearch = (values: IProductResult) => {

    setParams({
      ...values
    });
  };



  const [form] = Form.useForm();
  return (
    <Container>
      <HeadTitle {...HeadTitleProps} />
      <Form layout="horizontal" onFinish={handleOnSearch} form={form}>
        <Row gutter={16}>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name="name" label="">
                  <Input
                    placeholder="ค้นหา"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="producttype" label="">
                  <Select
                    options={getProducttype?.map((it) => ({ value: it.id, label: it.producttype_name }))}
                    placeholder="เลือกหมวดหมู่ เพื่อค้นหา"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="suitability" label="">
                  <Select
                    options={getSuitability?.map((it) => ({ value: it.id, label: it.suitability_name }))}
                    placeholder="เลือกความเหมาะสม เพื่อค้นหา"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="size" label="">
                  <Select
                    options={getSize?.map((it) => ({ value: it.id, label: it.size_name }))}
                    placeholder="เลือกไซ เพื่อค้นหา"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="color" label="">
                  <Select
                    options={getColor?.map((it) => ({ value: it.id, label: it.color_name }))}
                    placeholder="เลือกสี เพื่อค้นหา"
                  />
                </Form.Item>
              </Col>

            </Row>
          </Col>

          <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="reset" type="primary" size="large" onClick={() => setParams('')}>
              ยกเลิก
            </Button>
            <Button htmlType="submit" type="primary" size="large" style={{ marginLeft: '8px' }}>
              ค้นหา
            </Button>
          </Col>
        </Row>
      </Form>

      <OptionalLayout
        items={getAllProduct.data?.data}
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
