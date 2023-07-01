import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Container from '../../components/container'
import productApi, { getAllColor, getProductAll, getProducttypeAll, getSizeAll, getSuitabilityAll, useDeleteProduct, useGetProductAll, } from '../../services/auth/product/product.axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import authenApi from '../../services/auth/authen/authen';
import { QueryClient, useQueryClient } from 'react-query';
import { Button, Col, Form, Row, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IColor, IProductResult, IProducttype, ISize, ISuitability } from '../../interface/IProduct';
import React from 'react';
import form from 'antd/es/form';


function numberComma(num: number) {
  return num.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })
}

export default function ListProductAdmin() {
  const qClient = useQueryClient();
  const { data: products } = useGetProductAll();
  const navigate = useNavigate()

  const deleteProduct = useDeleteProduct()
  const onDelete = (id?: number) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        qClient.invalidateQueries(["get-all"]);
      }
    })
  }
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
      <Form layout="horizontal" onFinish={handleOnSearch} form={form}>
        <Row gutter={16}>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="producttype" label="">
                  <Select
                    options={getProducttype?.map((it) => ({ value: it.id, label: it.producttype_name }))}
                    placeholder="เลือกหมวดหมู่ เพื่อค้นหา"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="suitability" label="">
                  <Select
                    options={getSuitability?.map((it) => ({ value: it.id, label: it.suitability_name }))}
                    placeholder="เลือกความเหมาะสม เพื่อค้นหา"
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
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {getAllProduct.data?.data.map((product) => (
          <li
            key={product.name}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={product.img} alt="" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{product.name}</h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{product.detail}</dd>
                <dd className="text-sm text-gray-500"> สี {product.color?.color_name}</dd>
                <dd className="text-sm text-gray-500">  {product?.price?.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })} </dd>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    <p>ไซต์ {product.size?.size_name}</p>
                  </span>
                </dd>
              </dl>
            </div>

            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1" onClick={() => navigate(`/editproduct/${product.id}`)}>
                  <a

                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <EditOutlined className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    แก้ไขสินค้า
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1" onClick={() => onDelete(product?.id)}>

                  <a
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >

                    <DeleteOutlined className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    ลบสินค้า

                  </a>


                </div>
              </div>
            </div>
          </li>
        ))}
      </ul></Container>

  )
}
