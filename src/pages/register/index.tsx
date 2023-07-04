import { HomeOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Form, Button, Image, Space } from "antd";
import React from "react";
import { CInput, CInputPassword } from "../../components/input/c-input";
import { ISignin } from "../../services/auth/interface";
import { openNotification } from "../../components/notification";
import { useNavigate } from "react-router-dom";
import { UseSignin } from "../../services/auth/authen/authen";
import logo from "../../assets/images/LogoNo.png";
import { IRegister, IUser } from "../../interface/IUser";
import { useRegister } from "../../services/auth/user/user.axios";
import { useQueryClient } from "react-query";
import TextArea from "antd/es/input/TextArea";
type Props = {};

export default function Register({ }: Props) {
  const navigate = useNavigate();
  const register = useRegister()
  const qClient = useQueryClient();


  const onFinish = (value: IUser) => {
    const { name, email, password, address, tel } = value;
    register.mutate(
      {
        name,
        email,
        password,
        address,
        tel
      },
      {
        onSuccess: (res: any) => {
          openNotification({ type: "success" });

        },
        onError: ({ message }) => {
          openNotification({ type: "error", description: message });
        },
      }
    );
  };
  return (
    <React.Fragment>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={6}>
          <Space
            style={{
              display: "grid",
              justifyContent: "center",
            }}
          >
            <Image
              src={logo}
              preview={false}
              alt="image-logo"
              className="!w-44 !h-44 object-cover"
            />
          </Space>
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="name"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "กรุณากรอกชื่อ!",
                },
              ]}
              className="input-register"
            >
              <CInput prefix={<UserOutlined />} placeholder="ชื่อ..." />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "กรุณากรอกอีเมล!",
                },
              ]}
              className="input-register"
            >
              <CInput prefix={<MailOutlined />} placeholder="อีเมล..." />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "กรุณากรอกรหัสผ่าน!" },
              ]}
              className="input-register"
            >
              <CInputPassword
                prefix={<LockOutlined />}
                placeholder="รหัสผ่าน..."
              />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="address"
                rules={[
                  {
                    type: "string",
                    required: true,
                    message: "กรุณากรอกที่อยู่!",
                  },
                ]}
                className="input-register"
              >
                <TextArea rows={5} placeholder="ที่อยู่" />
              </Form.Item>
              <Form.Item
                name="tel"
                rules={[
                  {
                    type: "string",
                    required: true,
                    message: "กรุณากรอกเบอร์โทรศัพท์!",
                  },
                ]}
                className="input-register"
              >
                <CInput prefix={<PhoneOutlined />} placeholder="เบอร์โทรศัพท์..." />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="w-full " >
                ลงทะเบียน
              </Button>
            </Form.Item>
            <Form.Item>

              <Button type="primary" htmlType="submit" className="w-full" onClick={() => navigate("/login")}>
                เข้าสู่ระบบ
              </Button>

            </Form.Item>

          </Form>

        </Col>
      </Row>
    </React.Fragment>
  );
}
