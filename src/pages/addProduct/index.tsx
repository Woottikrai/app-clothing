import { Button, Col, Form, Row, UploadFile, UploadProps } from "antd";
import {
  IColor,
  IProduct,
  IProducttype,
  ISize,
  ISuitability,
} from "../../interface/IProduct";
import React, { FC } from "react";

import Upload, { UploadChangeParam, RcFile } from "antd/es/upload";
import { Image } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { openNotification } from "../../components/notification";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import { fileToDataUrl } from "../../util/media";
import {
  getAllColor,
  getProducttypeAll,
  getSizeAll,
  getSuitabilityAll,
  usePostProduct,
} from "../../services/auth/product/product.axios";
import CCard from "../../components/card";
import { CInput } from "../../components/input/c-input";
import TextArea from "antd/es/input/TextArea";
import { breadcrumbNameMap } from "../../routes/breadcrumb";
import { CSelect } from "../../components/input/c-select";

type Props = {
  onAny?: (value: IProduct) => void;
  disabled?: boolean;
};

const accepts = {
  array: ["jpg", "jpeg", "png", "webp"],
  string: ".jpg,.jpeg,.png,.webp",
};

export default function AddProduct({ onAny: disabled }: Props) {
  const post = usePostProduct();
  const [statusUpload, setStatusUpload] = React.useState(true);
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

  const HeadTitleProps = {
    title: "เพิ่มสินค้า",
    breadcrumbNameMap: breadcrumbNameMap,
  };

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

  const onFinish = (values: IProduct) => {
    post.mutate(
      {
        ...values,
        img: imageUrl,
      },
      {
        onSuccess: () => {
          openNotification({ type: "success" });
        },
        onError: ({ message }) => {
          openNotification({ type: "error", description: message });
        },
      }
    );
  };

  return (
    <Container>
      <HeadTitle {...HeadTitleProps} />
      <Form
        name="addproduct"
        labelCol={{ span: 24 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <UploadImage
              handleChange={handleChange}
              imageUrl={imageUrl}
              loading={loading}
              emptyImg={""}
            />
          </Col>
          <Col span={16}>
            <InputForm
              optionColors={getColor}
              optionSize={getSize}
              optionSuitability={getSuitability}
              optionsProducttype={getProducttype}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

interface UploadImageProps {
  handleChange?: (info?: any) => void;
  loading?: boolean;
  imageUrl?: string;
  emptyImg?: string;
}

const UploadImage: FC<UploadImageProps> = ({
  handleChange,
  loading,
  imageUrl,
  emptyImg,
}) => {
  return (
    <React.Fragment>
      <CCard className="">
        <>
          <Form.Item
            valuePropName="fileList"
            rules={[{ required: true }]}
            className="w-full"
            style={{
              display: "grid",
              justifyContent: "center",
              margin: 0,
            }}
          >
            <Upload
              name="img"
              className="avatar-uploader !h-[250px]"
              showUploadList={false}
              accept={accepts.string}
              beforeUpload={() => false}
              onChange={handleChange}
              listType="picture-card"
              style={{}}
            >
              <div className="">
                {loading ? (
                  <LoadingOutlined />
                ) : !!imageUrl ? (
                  <Image
                    preview={false}
                    src={imageUrl}
                    // alt="img"
                    className="!object-fill"
                  />
                ) : (
                  <Image
                    preview={false}
                    src={emptyImg}
                    // alt="img"
                    className="!object-fill"
                  />
                )}
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </>
      </CCard>
    </React.Fragment>
  );
};

interface InputFormProps {
  optionColors?: IColor[];
  optionSize?: ISize[];
  optionsProducttype?: IProducttype[];
  optionSuitability?: ISuitability[];
}

const InputForm: FC<InputFormProps> = ({
  optionColors,
  optionSize,
  optionSuitability,
  optionsProducttype,
}) => {
  console.log(optionSize);
  return (
    <React.Fragment>
      <CCard>
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="ชื่อสินค้า"
              rules={[{ required: true }]}
            >
              <CInput placeholder="ชื่อสินค้า" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="price" label="ราคา" rules={[{ required: true }]}>
              <CInput type="number" min={0} placeholder="ราคา" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="detail"
          label="รายละเอียดสินค้า"
          rules={[{ required: true }]}
        >
          <TextArea rows={5} placeholder="...รายละเอียดสินค้า" />
        </Form.Item>{" "}
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item
              name="colorId"
              label="เลือกสี"
              rules={[{ required: true }]}
            >
              <CSelect
                options={optionColors?.map((it) => {
                  return { value: it.id, label: it.color_name };
                })}
                placeholder="เลือกสี"
              />
            </Form.Item>{" "}
          </Col>
          <Col span={12}>
            <Form.Item
              name="sizeId"
              label="เลือกขนาด"
              rules={[{ required: true }]}
            >
              <CSelect
                options={optionSize?.map((it) => {
                  return { value: it.id, label: it.size_name };
                })}
                placeholder="เลือกขนาด"
              />
            </Form.Item>{" "}
          </Col>
        </Row>
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item
              name="producttypeId"
              label="เลือกหมวดหมู่"
              rules={[{ required: true }]}
            >
              <CSelect
                options={optionsProducttype?.map((it) => {
                  return { value: it.id, label: it.producttype_name };
                })}
                placeholder="เลือกหมวดหมู่"
              />
            </Form.Item>{" "}
          </Col>
          <Col span={12}>
            <Form.Item
              name="suitabilityId"
              label="เลือกความเหมาะสม"
              rules={[{ required: true }]}
            >
              <CSelect
                options={optionSuitability?.map((it) => {
                  return { value: it.id, label: it.suitability_name };
                })}
                placeholder="เลือกความเหมาะสม"
              />
            </Form.Item>{" "}
          </Col>
        </Row>
        <div className="text-end">
          <Button
            htmlType="reset"
            type="default"
            size="large"
            style={{
              marginRight: 10,
            }}
          >
            ยกเลิก
          </Button>
          <Button htmlType="submit" type="primary" size="large">
            บันทึก
          </Button>
        </div>
      </CCard>
    </React.Fragment>
  );
};
