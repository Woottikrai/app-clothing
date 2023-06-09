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
import img from '../../assets/images/camera.jpg'
import { Image } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { openNotification } from "../../components/notification";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import { fileToDataUrl } from "../../util/media";
import { addProduct, getAllColor, getProducttypeAll, getSizeAll, getSuitabilityAll } from "../../services/auth/product/product.axios";
import { error } from "console";
import { type } from "os";

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



  const onFinish = ((values: IProduct) => {
    addProduct({
      name: values.name,
      detail: values.detail,
      price: values.price,
      img: imageUrl,
      sizeId: values.sizeId,
      producttypeId: values.producttypeId,
      suitabilityId: values.suitabilityId,
      colorId: values.colorId,
    }).then(() => {
      openNotification({ type: "success", title: "success" });
    }).catch((err) => {
      openNotification({ type: "error", title: `${err}` });
    })
      .finally(() => {
        navigate(-1);
      });
  })


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

          <Form.Item label="Upload" valuePropName="fileList" >
            <Upload name="img"
              className="avatar-uploader"
              showUploadList={false}
              accept={accepts.string}
              beforeUpload={() => false}
              onChange={handleChange}
              listType="picture-card">
              <div>
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
                    // src={img}
                    alt="img"
                    className="!h-52 !w-52 object-fill"
                  />
                )}
                <PlusOutlined />
                <div style={{ marginTop: 8, }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

        </Form>
      </Container>
    </>
  );
}
