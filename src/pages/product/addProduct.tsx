import { Col, Form, Input, Row, Select, UploadFile, UploadProps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  IColor,
  IProduct,
  IProducttype,
  ISize,
  ISuitability,
} from "../../interface/IProduct";
import React from "react";

import Upload, { UploadChangeParam, RcFile } from "antd/es/upload";

import { Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import imageProfile from "../../assets/img/camera.jpg";
import { openNotification } from "../../components/notification";
import { productApi } from "../../services/auth/product/product.axios";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import { fileToDataUrl } from "../../util/media";

type Props = {
  onAny?: (value: IProduct) => void;
  disabled?: boolean;
};

const accepts = {
  array: ["jpg", "jpeg", "png", "webp"],
  string: ".jpg,.jpeg,.png,.webp",
};

export default function AddProduct({ onAny: disabled }: Props) {
  const navigate = useNavigate();
  const [statusUpload, setStatusUpload] = React.useState(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [getColor, setColor] = React.useState<Array<IColor>>([]);
  const [getProducttype, setProducttype] = React.useState<Array<IProducttype>>(
    []
  );
  const [getSize, setSize] = React.useState<Array<ISize>>([]);
  const [getSuitability, setSuitability] = React.useState<Array<ISuitability>>(
    []
  );
  const [imageUrl, setImageUrl] = React.useState<string>();

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    setLoading(true);
    if (info.file && info.fileList?.length > 0) {
      try {
        const image = info.file as RcFile;
        const extension = image.name.split(".").pop()?.toLocaleLowerCase();
        if (!extension || !accepts.array.includes(extension)) {
          throw new Error("รองรับไฟล์ประเภท .jpg, .jpeg และ .png เท่านั้น");
        }
        const base64 = await fileToDataUrl(image);
        if (typeof base64 !== "string") {
          throw new Error("error-occured");
        }

        const isLt2M = image.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          throw new Error("กรุณาอัพไฟล์ไม่เกิน 2mb");
        }
        setTimeout(() => {
          uploadMedia();
        }, 2000);
        setImageUrl(base64);
        console.log("success");
      } catch (err: any) {
        openNotification({
          type: "error",
          title: "เกิดข้อผิดพลาด",
          description: err?.message,
        });
      }
    }
  };

  const uploadMedia = async () => {
    setStatusUpload(true);
    setLoading(false);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onSubmit = () => {
    form.submit();
  };
  const HeadTitleProps = {
    title: "Create Product",
  };

  React.useEffect(() => {
    (async () => {
      const res = await productApi.getAllColor();
      setColor(res);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const res = await productApi.getProducttypeAll();
      setProducttype(res);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const res = await productApi.getSizeAll();
      setSize(res);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const res = await productApi.getSuitabilityAll();
      setSuitability(res);
    })();
  }, []);

  const onFinish = (values: IProduct) => {
    console.log(values);

    productApi
      .addProduct({
        name: values.name,
        detail: values.detail,
        price: values.price,
        img: imageUrl,
        sizeId: values.sizeId,
        producttypeId: values.producttypeId,
        suitabilityId: values.suitabilityId,
        colorId: values.colorId,
      })
      .then(() => {
        openNotification({ type: "success", title: "success" });
      })
      .catch((err) => {
        openNotification({ type: "error", title: `${err}` });
      })
      .finally(() => {
        navigate(-1);
      });
  };

  return (
    <>
      <Container>
        <Form
          name="addproduct"
          labelCol={{ span: 24 }}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <HeadTitle
                {...HeadTitleProps}
                onSubmit={!disabled && onSubmit}
                onCancel={onCancel}
              />
            </Col>
            <Col span={6}>
              <Form.Item
                label="ชื่อสินค้า"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Product Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="รายละเอียดสินค้า"
                name="detail"
                rules={[
                  {
                    required: true,
                    message: "Please input your Product Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="ราคาสินค้า"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your Product Price!",
                    min: 0,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="colorId"
                label="เลือกสี"
                rules={[
                  {
                    required: true,
                    message: "Please input your Product Color!",
                  },
                ]}
              >
                <Select
                  defaultValue={"Select"}
                  options={getColor.map((it) => {
                    return { value: it.id, label: it.color_name };
                  })}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="producttypeId"
                label="เลือกชนิดสินค้า"
                rules={[
                  {
                    required: true,
                    message: "Please input your Product Type!",
                  },
                ]}
              >
                <Select
                  defaultValue={"Select"}
                  options={getProducttype.map((it) => {
                    return { value: it.id, label: it.producttype_name };
                  })}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="sizeId"
                label="เลือกขนาด"
                rules={[
                  {
                    required: true,
                    message: "Please input your Product Size!",
                  },
                ]}
              >
                <Select
                  defaultValue={"Select"}
                  options={getSize.map((it) => {
                    return { value: it.id, label: it.size_name };
                  })}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="suitabilityId"
                label="เลือกความเหมาะสม"
                rules={[
                  {
                    required: true,
                    message: "Please input your Product Size!",
                  },
                ]}
              >
                <Select
                  defaultValue={"Select "}
                  options={getSuitability.map((it) => {
                    return { value: it.id, label: it.suitability_name };
                  })}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <center>
              <Form.Item
                name={"img"}
                valuePropName="src"
                className="w-full center"
                style={{ margin: 0 }}
              >
                <Upload
                  name="img"
                  className="avatar-uploader"
                  showUploadList={false}
                  accept={accepts.string}
                  beforeUpload={() => false}
                  onChange={handleChange}
                >
                  <div className="avatar-item">
                    {loading ? (
                      <LoadingOutlined />
                    ) : !!imageUrl ? (
                      <Image
                        preview={false}
                        src={imageUrl}
                        alt="img"
                        className="!h-52 !w-52 object-fill"
                      />
                    ) : (
                      <Image
                        preview={false}
                        src={imageProfile}
                        alt="img"
                        className="!h-52 !w-52 object-fill"
                      />
                    )}
                  </div>
                </Upload>
              </Form.Item>
            </center>
          </Col>
        </Form>
      </Container>
    </>
  );
}
